---
title: "ADR-0007: WordPress roles are declared in the app, not created over REST"
description: The REST API cannot create roles or attach capabilities, so the adapter declares the model and audits the live site against it.
---

# ADR-0007: WordPress roles are declared in the app, not created over REST

**Status:** Accepted · **Date:** 2026-10-18

## Context

WordPress roles are created with `add_role()` and capabilities are attached
with `add_cap()`. Both are PHP APIs. The REST API has no roles endpoint and no
capabilities endpoint — the [users endpoint](https://developer.wordpress.org/rest-api/reference/users/)
only *reads* `roles`, `capabilities` and `extra_capabilities`, and only with
`context=edit` and an authenticated caller holding `list_users`.

That leaves three audiences with three different needs:

1. **The site**, which must end up with the role and its capabilities. Only
   PHP can do that: a plugin, an mu-plugin, or `wp-cli role add`.
2. **The dashboard**, which owns the user experience and must decide what to
   show, which routes to guard, and what the policy *is*.
3. **The person deploying**, who needs to know whether the site actually matches
   the declaration instead of assuming it does.

A fourth problem makes naive adoption worse: `wp_update_user()` silently drops
a role slug the site does not know. The response is a `200` with the user
unchanged, so `useWpUpdateUser({ roles })` reports success for a grant that never
happened. An audit that accepts "no error" as proof inherits that lie.

## Decision

The WordPress adapter separates *declaring* the model from *applying* it, and
never pretends the second is possible from JavaScript.

A role declaration (`WpRoleDefinition`) carries both capability vocabularies:

- `capabilities` — the toolkit's namespaced capabilities (`orders:read:own`),
  which drive `useCan()` and the framework guards.
- `wpCapabilities` — WordPress' snake_case names (`read_private_orders`), the
  declaration the site must hold.

They are never derived from one another. `orders:read:own` is a policy
statement; `read_private_orders` is a WordPress permission. Collapsing them
would hide who may touch somebody else's record.

On top of the declaration:

- `useWpSyncRoles()` publishes declarations to the access service so guards
  understand WordPress role slugs. It is explicit, not a side effect of
  declaring: `useCan()` throws on an unknown slug by design, and that throw is
  the signal that the boot sequence is incomplete.
- `useWpAssignRole()` verifies the roles on the response and fails with `422`
  when the grant did not land, naming the missing role. Unassignment is
  idempotent instead, because nothing there can be silently ignored.
- `useWpAuditRole()` compares the declaration against the capabilities WordPress
  reports for the role's holders. `granted` is the intersection across holders —
  a capability only one holder has is not a capability the role grants. With no
  holders the status is `unverifiable`, never `verified`: an empty list is not
  proof.

## Consequences

**Better.** A no-PHP dashboard gets a real authorization model instead of a
role slug string, and gets told — with evidence — when the site disagrees with
it. A silently dropped grant can no longer masquerade as a success. Roles,
capabilities and guards read one vocabulary, so a route guard and the button
that hides itself cannot drift apart.

**Worse.** The deployment still needs a PHP step somewhere (a plugin, an
mu-plugin, `wp-cli`) for a role that does not exist yet; the adapter cannot
remove that step, only stop pretending it is unnecessary. An audit needs
`context=edit`, so a subscriber-level token cannot run one. Every role call asks
for `context=edit` and pays the larger payload. And `wpCapabilities` is
declaration-only data: it is never enforced by this toolkit, only compared, so
a stale declaration is possible where an enforced one would not be.

## Links

- [WordPress guide — roles and capabilities without PHP](/guides/wordpress#9-roles-and-capabilities-without-php)
- [Access Control](/guides/access-control) — the registry the declarations feed.
