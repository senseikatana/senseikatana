import { z } from "zod";

/**
 * Role slugs that ship with the kit, ordered from most to least privileged.
 *
 * The vocabulary is deliberately editorial but domain-neutral — it describes
 * *how much* of a resource pool a subject may touch, not *which* domain it
 * belongs to. Deployments that need other names register their own (see
 * `useRegisterRole`); nothing here is closed.
 *
 * - `owner` — the developer seat: the only role that can grant other roles.
 * - `admin` — day-to-day administration: manage members, moderate anything.
 * - `editor` — act on **anyone's** resource in the pool.
 * - `author` — act on **their own**, including publishing.
 * - `contributor` — act on their own but **not** publish.
 * - `member` — a registered account with no authoring rights.
 * - `guest` — the anonymous default; read-only where reading is public.
 */
export const BUILT_IN_ROLE_SLUGS = [
	"owner",
	"admin",
	"editor",
	"author",
	"contributor",
	"member",
	"guest",
] as const;

/**
 * A role slug: lowercase, and made of alphanumeric words joined by `_`, `.`
 * or `-`. The format is enforced so a typo fails loudly at the schema
 * boundary instead of silently granting nothing.
 */
export const AccessRoleSchema = z
	.string()
	.min(1)
	.max(64)
	.regex(
		/^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/,
		"Role slug must be lowercase alphanumerics joined by '_', '.' or '-'",
	);

/**
 * Capabilities that ship with the kit. Namespaced as `<domain>:<action>
 * [:<scope>]`; the scope suffix is what keeps `edit:own` and `edit:any`
 * from being confused. Open-ended by design — a deployment that needs
 * `expediente:firmar` or `nomina:aprobar` registers its own.
 */
export const BUILT_IN_CAPABILITIES = [
	"content:create",
	"content:publish",
	"content:edit:own",
	"content:edit:any",
	"content:delete:own",
	"content:delete:any",
	"conversations:use",
	"conversations:moderate",
	"members:manage",
	"members:suspend",
	"members:delete",
	"roles:assign",
	"system:admin",
] as const;

/**
 * A capability: at least `<domain>:<action>`, optionally `:action:<scope>`.
 * Rejecting a bare word matters — an unscoped `delete` is exactly the
 * ambiguity `content:delete:own` exists to remove.
 */
export const AccessCapabilitySchema = z
	.string()
	.min(3)
	.max(128)
	.regex(
		/^[a-z][a-z0-9]*(?::[a-z0-9]+)+$/,
		"Capability must be '<domain>:<action>' or '<domain>:<action>:<scope>'",
	);

/**
 * A role definition.
 *
 * `rank` lives on the definition rather than in a lookup table so a custom
 * role participates in the hierarchy on equal terms — a rank hardcoded
 * outside the registry makes every registered role silently inherit nothing.
 * Lower is more privileged.
 */
export const AccessRoleDefinitionSchema = z.object({
	slug: AccessRoleSchema,
	label: z.string().min(1),
	rank: z.number().int().nonnegative(),
	capabilities: z.array(AccessCapabilitySchema),
});

/**
 * Structural subject for access checks. Decoupled from the persistence layer:
 * any object with an id and a role list can be checked (e.g. a Prisma
 * `Account` row, a JWT payload, or a test fixture).
 *
 * Loose on purpose. A real deployment carries extra context alongside the
 * roles — the authenticated principal, a department, a tenant — and the core
 * has no business rejecting keys it does not interpret. Whatever a capability
 * means beyond "has the role" is enforced by the caller, against the resource.
 */
export const AccessSubjectSchema = z.looseObject({
	id: z.union([z.string(), z.number()]),
	roles: z.array(AccessRoleSchema),
});
