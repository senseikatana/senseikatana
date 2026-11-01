---
title: WordPress Roles
description: Create the WordPress roles your dashboard declares — wp-cli or a mu-plugin, the capability vocabulary, and the two traps that cost you a page load.
---

# WordPress Roles

The [WordPress adapter](/guides/wordpress) declares roles, assigns them and
audits what the site grants. It cannot **create** them: the REST API has no
roles or capabilities endpoint, so `add_role()` and `add_cap()` have no remote
equivalent.

This page is the other half of that workflow — how to make WordPress actually
have the role your dashboard expects. Choose one of the two options below and
then verify the result with `useWpAuditRole()`.

> A dashboard that assigns a role WordPress does not know gets a `422` from
> `useWpAssignRole()`, naming the missing role. That is the signal this page
> addresses. See [ADR-0007](/explanation/decisions/adr-0007-wordpress-roles-declared-not-created)
> for why the split exists at all.

## The capability vocabulary

Before choosing an option, know which capabilities belong on the role.

Register the custom post type with a **capability type of its own** and meta-cap
mapping on:

```php
register_post_type( 'order', [
	'public'       => true,
	'capability_type' => [ 'order', 'orders' ],
	'map_meta_cap'    => true,
	// ...
] );
```

That single change generates a capability set from the pair `order` / `orders`
— one meta capability per verb and one primitive per plural verb:

| Kind | Capabilities | Grant to a role? |
| --- | --- | --- |
| **Meta** (singular) | `read_order`, `edit_order`, `delete_order` | **No** |
| **Primitive** (plural) | `edit_orders`, `publish_orders`, `edit_published_orders`, `edit_private_orders`, `read_private_orders`, `delete_orders`, `delete_published_orders`, `delete_private_orders`, `edit_others_orders`, `delete_others_orders` | Yes, the ones you mean |

**Never grant the singular forms to a role.** They are meta capabilities:
WordPress derives them *per object* from the primitives, scoped to the owner.
Granting them literally turns every ID-less check into a pass for the whole
role:

```php
current_user_can( 'delete_order' );           // true for any order in the site
current_user_can( 'delete_order', $order_id ); // scoped to the owner
```

Plenty of code checks the first form. The primitives already produce the right
answer for the second form through `map_meta_cap`, so the singular ones add
nothing but exposure.

### What each role needs

A **customer** acts on their own orders:

```php
'read'                    => true,
'edit_orders'             => true,
'publish_orders'          => true,
'edit_published_orders'   => true,
'edit_private_orders'     => true,
'delete_orders'           => true,
'delete_published_orders' => true,
```

A **manager** acts on anyone's:

```php
'read'                    => true,
'edit_orders'             => true,
'publish_orders'          => true,
'edit_published_orders'   => true,
'edit_private_orders'     => true,
'edit_others_orders'      => true,
'read_private_orders'     => true,
'delete_orders'           => true,
'delete_published_orders' => true,
'delete_private_orders'   => true,
'delete_others_orders'    => true,
```

Notice the customer set omits every `*_others_*` and `read_private_orders`.
That is the whole boundary: without `edit_others_orders`, WordPress refuses
access to someone else's record even though the verb is granted.

## Option A — wp-cli

No PHP in your repository at all. One command per role:

```bash
wp role add store_customer "Store Customer" \
  --capabilities='{"read":true,"edit_orders":true,"publish_orders":true,"edit_published_orders":true,"edit_private_orders":true,"delete_orders":true,"delete_published_orders":true}'

wp cap add administrator edit_orders publish_orders edit_published_orders \
  edit_private_orders edit_others_orders read_private_orders delete_orders \
  delete_published_orders delete_private_orders delete_others_orders
```

`wp role add` is idempotent on the name but will not update an existing role's
capabilities either — same rule as `add_role()`, below.

## Option B — a mu-plugin

Drop this in `wp-content/mu-plugins/store-orders-roles.php`. A mu-plugin loads
without activation and cannot be deactivated by accident, which is what you
want for a role the dashboard depends on.

```php
<?php
/**
 * Plugin Name: Store Orders — Roles
 * Description: Registers the roles and capabilities for the order post type.
 * Version: 1.0.0
 */

declare(strict_types=1);

const STORE_CUSTOMER_ROLE = 'store_customer';

/**
 * Primitives only. The singular forms (read_order, edit_order, delete_order)
 * are META capabilities: WordPress derives them per order from these, scoped
 * to the owner. Granting them literally makes ID-less checks pass for every
 * order in the site.
 */
const STORE_CUSTOMER_CAPS = [
	'read'                    => true,
	'edit_orders'             => true,
	'publish_orders'          => true,
	'edit_published_orders'   => true,
	'edit_private_orders'     => true,
	'delete_orders'           => true,
	'delete_published_orders' => true,
];

const STORE_MANAGER_CAPS = [
	'read'                    => true,
	'edit_orders'             => true,
	'publish_orders'          => true,
	'edit_published_orders'   => true,
	'edit_private_orders'     => true,
	'edit_others_orders'      => true,
	'read_private_orders'     => true,
	'delete_orders'           => true,
	'delete_published_orders' => true,
	'delete_private_orders'   => true,
	'delete_others_orders'    => true,
];

function store_orders_register_roles(): void {
	// One call, one write — and none at all once the role exists, because
	// add_role() returns early when the slug is already registered.
	add_role( STORE_CUSTOMER_ROLE, 'Store Customer', STORE_CUSTOMER_CAPS );

	$admin = get_role( 'administrator' );
	if ( ! $admin instanceof WP_Role ) {
		return;
	}

	foreach ( array_keys( STORE_MANAGER_CAPS ) as $cap ) {
		// The guard that keeps this off the database on every request.
		if ( ! $admin->has_cap( $cap ) ) {
			$admin->add_cap( $cap );
		}
	}
}
add_action( 'init', 'store_orders_register_roles' );
```

### The two traps in that code

Both come from the WordPress core source, and both are easy to miss.

**`add_cap()` writes to the database on every call.** `WP_Roles::add_cap()`
sets the capability and calls `update_option( 'wp_user_roles', … )`
unconditionally — it does not check whether the capability is already there:

```php
public function add_cap( $role, $cap, $grant = true ) {
	if ( ! isset( $this->roles[ $role ] ) ) {
		return;
	}
	$this->roles[ $role ]['capabilities'][ $cap ] = $grant;
	if ( $this->use_db ) {
		update_option( $this->role_key, $this->roles );   // every call
	}
}
```

A loop that calls `add_cap()` unconditionally performs one `UPDATE` to
`wp_options` **per capability, on every request** — for a result that is already
in the database. The `has_cap()` check above is what keeps this quiet. Adding
the capabilities inside `add_role()` instead of a loop removes the problem
entirely for the new role.

**`add_role()` never updates an existing role.** It returns early when the slug
is already registered, so changing the capability list later has no effect. For
development, `remove_role()` then `add_role()` re-applies it. In production,
add only the new capabilities after a version check:

```php
if ( get_option( 'store_orders_roles_version' ) < 2 ) {
	$role = get_role( STORE_CUSTOMER_ROLE );
	if ( $role instanceof WP_Role ) {
		$role->add_cap( 'cancel_orders' );   // one write, once
	}
	update_option( 'store_orders_roles_version', 2 );
}
```

## Verify the result

The declaration in your dashboard and the capabilities in WordPress have to say
the same thing. `useWpAuditRole()` compares them:

```ts
import {
	defineWordPressConfig,
	useWpDefineRoles,
	useWpAuditRole,
	useWpSyncRoles,
} from "katanakit-js/adapters/wordpress";

defineWordPressConfig({
	baseUrl: "https://mysite.com",
	auth: { type: "application-passwords", username: "admin", password: "xxxx xxxx xxxx" },
});

useWpDefineRoles([
	{
		slug: "store_customer",
		label: "Store Customer",
		rank: 5,
		capabilities: ["orders:read:own", "orders:update:own", "orders:cancel:own"],
		wpCapabilities: [
			"read",
			"edit_orders",
			"publish_orders",
			"edit_published_orders",
			"edit_private_orders",
			"delete_orders",
			"delete_published_orders",
		],
	},
]);
useWpSyncRoles();

const audit = await useWpAuditRole("store_customer");

if (audit.ok) {
	console.log(audit.data.status); // "verified" | "partial" | "unverifiable"
	console.log(audit.data.missing); // declared here, absent on the site
	console.log(audit.data.undeclared); // granted by the site, not declared
}
```

- `verified` — every holder of the role reports every declared `wpCapability`.
- `partial` — at least one declared capability is missing from some holder.
- `unverifiable` — nobody holds the role yet, so there is nothing to compare.
  Never reported as `verified`: an empty list is not proof.

`missing` and `undeclared` are the two directions of drift. If you removed the
singular capabilities from the plugin above, remove them from `wpCapabilities`
too — otherwise the audit reports `partial` for a difference that is deliberate.

Reading capabilities needs `list_users`; a subscriber-level token gets `403`
and the audit surfaces it as a failed request.

## Related

- [WordPress adapter](/guides/wordpress) — declare, assign and audit from the dashboard.
- [Access Control](/guides/access-control) — the roles and capabilities the declarations feed.
- [ADR-0007](/explanation/decisions/adr-0007-wordpress-roles-declared-not-created) — why the model lives in the app and not in PHP.
