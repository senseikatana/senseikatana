import { AccessRoleDefinitionSchema } from "@/schemas/access.schema.js";
import type {
	AccessCapability,
	AccessRole,
	AccessRoleDefinition,
	AccessSubject,
} from "@/types/index.js";

/* -------------------------------------------------------------------------- */
/* Strategy contract                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Estrategia de verificación de acceso - Strategy Pattern.
 *
 * Define el contrato que toda implementación de control de acceso debe
 * cumplir. El {@link AccessService} delega en una estrategia concreta,
 * permitiendo intercambiar el algoritmo de autorización sin tocar al cliente.
 */
export interface IAccessStrategy {
	/** Effective capabilities of a role (own plus inherited). */
	useCapabilitiesFor(role: AccessRole): AccessCapability[];
	/** Registers (or replaces) a role definition. */
	useRegisterRole(definition: AccessRoleDefinition): void;
	/** Restores the built-in role registry. */
	useResetRoles(): void;
	/** Lists every registered role definition. */
	useRoles(): AccessRoleDefinition[];
	/** Exact role membership - no hierarchy involved. */
	useHasRole(subject: AccessSubject, role: AccessRole): boolean;
	/** Whether the subject may perform a capability. */
	useCan(subject: AccessSubject, capability: AccessCapability): boolean;
}

/* -------------------------------------------------------------------------- */
/* Role hierarchy (shared between strategies)                                 */
/* -------------------------------------------------------------------------- */

/**
 * Default role registry: each role lists only the capabilities it adds on top
 * of the roles below it. `guest` adds none - read access is public by default.
 *
 * `rank` is data, not a lookup table. That is what lets a registered role
 * inherit from the built-ins instead of silently inheriting nothing.
 */
const DEFAULT_ROLES: AccessRoleDefinition[] = (
	[
		{ slug: "owner", label: "Owner", rank: 0, capabilities: ["roles:assign", "system:admin"] },
		{ slug: "admin", label: "Admin", rank: 1, capabilities: ["members:manage"] },
		{
			slug: "editor",
			label: "Editor",
			rank: 2,
			capabilities: [
				"content:publish",
				"content:edit:any",
				"content:delete:any",
				"conversations:moderate",
			],
		},
		{
			slug: "author",
			label: "Author",
			rank: 3,
			capabilities: ["content:create", "content:edit:own", "content:delete:own"],
		},
		{ slug: "member", label: "Member", rank: 4, capabilities: ["conversations:use"] },
		{ slug: "guest", label: "Guest", rank: 5, capabilities: [] },
	] satisfies AccessRoleDefinition[]
).map((role) => Object.freeze(useCopy(role)));

/** Copies a definition so callers never hold (or mutate) live registry state. */
function useCopy(definition: AccessRoleDefinition): AccessRoleDefinition {
	return { ...definition, capabilities: [...definition.capabilities] };
}

/**
 * Validates a definition before it reaches the registry.
 *
 * The registry stores plain objects, so a malformed definition would otherwise
 * poison every check silently — a missing `rank` makes `definition.rank >= rank`
 * compare `undefined`, which is never true, and the role silently inherits
 * nothing while still appearing in `useRoles()`. Failing at the door is the
 * only version of this that is safe.
 */
function useValidated(definition: AccessRoleDefinition): AccessRoleDefinition {
	const parsed = AccessRoleDefinitionSchema.safeParse(definition);
	if (!parsed.success) {
		const details = parsed.error.issues
			.map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`)
			.join("; ");
		throw new Error(
			`[AccessService] rejected role definition "${definition?.slug ?? "?"}" — ${details}`,
		);
	}
	return parsed.data;
}

/* -------------------------------------------------------------------------- */
/* Concrete strategies                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Estrategia por defecto: control de acceso jerárquico basado en roles
 * registrados. Es la estrategia estándar del servicio.
 *
 * @example
 * ```ts
 * const strategy = new HierarchicalAccessStrategy();
 * strategy.useCan({ id: 1, roles: ["editor"] }, "content:create"); // true
 * ```
 */
export class HierarchicalAccessStrategy implements IAccessStrategy {
	/** Active registry, keyed by role slug. Starts as the default set. */
	private registry: Map<AccessRole, AccessRoleDefinition>;

	constructor() {
		this.registry = new Map<AccessRole, AccessRoleDefinition>(
			DEFAULT_ROLES.map((role) => [role.slug, role]),
		);
	}

	private useDefinitionFor(role: AccessRole): AccessRoleDefinition {
		const definition = this.registry.get(role);
		if (!definition) {
			throw new Error(`Unknown access role: ${role}`);
		}
		return definition;
	}

	/**
	 * Effective capabilities of a role: its own plus every less-privileged role's.
	 *
	 * @example
	 * ```ts
	 * useCapabilitiesFor("author"); // content:create, content:edit:own, ..., conversations:use
	 * useCapabilitiesFor("guest");  // []
	 * ```
	 */
	useCapabilitiesFor(role: AccessRole): AccessCapability[] {
		const rank = this.useDefinitionFor(role).rank;
		const capabilities = new Set<AccessCapability>();

		for (const definition of this.registry.values()) {
			if (definition.rank >= rank) {
				for (const capability of definition.capabilities) {
					capabilities.add(capability);
				}
			}
		}
		return [...capabilities];
	}

	/**
	 * Registers (or replaces) a role definition. Use it to extend a built-in
	 * role's capabilities, e.g. grant `content:create` to `member`, or to add
	 * a deployment-specific role that inherits from the built-ins by rank.
	 * The definition is copied, so mutating the caller's object afterwards
	 * has no effect.
	 */
	useRegisterRole(definition: AccessRoleDefinition): void {
		const validated = useValidated(definition);
		this.registry.set(validated.slug, Object.freeze(useCopy(validated)));
	}

	/** Restores the built-in role registry (mainly for tests). */
	useResetRoles(): void {
		this.registry.clear();
		for (const role of DEFAULT_ROLES) {
			this.registry.set(role.slug, role);
		}
	}

	/** Lists every registered role definition. Returns copies, not live state. */
	useRoles(): AccessRoleDefinition[] {
		return [...this.registry.values()].sort((a, b) => a.rank - b.rank).map(useCopy);
	}

	/** Exact role membership - no hierarchy involved. */
	useHasRole(subject: AccessSubject, role: AccessRole): boolean {
		return subject.roles.includes(role);
	}

	/**
	 * Whether the subject may perform a capability. Any of the subject's roles
	 * granting the capability (directly or by inheritance) is enough.
	 *
	 * @example
	 * ```ts
	 * useCan({ id: 1, roles: ["author"] }, "content:publish"); // false
	 * useCan({ id: 1, roles: ["author"] }, "content:create");  // true
	 * useCan({ id: 2, roles: ["editor"] }, "content:create");  // true (inherits author)
	 * useCan({ id: 3, roles: [] }, "conversations:use");       // false
	 * ```
	 */
	useCan(subject: AccessSubject, capability: AccessCapability): boolean {
		return subject.roles.some((role) => this.useCapabilitiesFor(role).includes(capability));
	}
}

/**
 * Estrategia estricta: sólo verifica capacidades declaradas explícitamente
 * en el rol del sujeto, sin her jerarquía. Útil cuando cada rol debe
 * declarar todo lo que puede hacer.
 *
 * @example
 * ```ts
 * const access = new AccessService(new FlatAccessStrategy());
 * // "editor" ya NO hereda las capacidades de "author"
 * access.useCan({ id: 1, roles: ["editor"] }, "content:create"); // false
 * ```
 */
export class FlatAccessStrategy implements IAccessStrategy {
	private registry: Map<AccessRole, AccessRoleDefinition>;

	constructor() {
		this.registry = new Map<AccessRole, AccessRoleDefinition>(
			DEFAULT_ROLES.map((role) => [role.slug, role]),
		);
	}

	useCapabilitiesFor(role: AccessRole): AccessCapability[] {
		const definition = this.registry.get(role);
		return definition ? [...definition.capabilities] : [];
	}

	useRegisterRole(definition: AccessRoleDefinition): void {
		const validated = useValidated(definition);
		this.registry.set(validated.slug, Object.freeze(useCopy(validated)));
	}

	useResetRoles(): void {
		this.registry.clear();
		for (const role of DEFAULT_ROLES) {
			this.registry.set(role.slug, role);
		}
	}

	useRoles(): AccessRoleDefinition[] {
		return [...this.registry.values()].sort((a, b) => a.rank - b.rank).map(useCopy);
	}

	useHasRole(subject: AccessSubject, role: AccessRole): boolean {
		return subject.roles.includes(role);
	}

	useCan(subject: AccessSubject, capability: AccessCapability): boolean {
		return subject.roles.some((role) => this.useCapabilitiesFor(role).includes(capability));
	}
}

/* -------------------------------------------------------------------------- */
/* Context (Singleton facade)                                                 */
/* -------------------------------------------------------------------------- */

/**
 * AccessService - Singleton facade con Strategy Pattern.
 *
 * Centraliza el control de acceso (roles y capacidades) delegando el
 * algoritmo concreto en una {@link IAccessStrategy} intercambiable.
 * Por defecto usa {@link HierarchicalAccessStrategy}.
 *
 * @example
 * ```ts
 * // Uso con la estrategia por defecto (jerárquica)
 * AccessService.getInstance().useCan({ id: 1, roles: ["admin"] }, "members:manage");
 *
 * // Cambiar a estrategia plana en runtime
 * AccessService.getInstance().useSetStrategy(new FlatAccessStrategy());
 * ```
 */
export class AccessService {
	private static instance: AccessService;
	private strategy: IAccessStrategy;

	/**
	 * Constructor privado - enforce singleton.
	 * @param strategy - Estrategia a inyectar (opcional).
	 */
	private constructor(strategy?: IAccessStrategy) {
		this.strategy = strategy ?? new HierarchicalAccessStrategy();
	}

	/**
	 * Obtiene la instancia única del AccessService (Singleton).
	 *
	 * @returns La instancia única de {@link AccessService}.
	 */
	static getInstance(): AccessService {
		if (!AccessService.instance) {
			AccessService.instance = new AccessService();
		}
		return AccessService.instance;
	}

	/**
	 * Crea una instancia NO-singleton con una estrategia específica.
	 * Útil para tests o para aislar varios contextos de acceso.
	 *
	 * @param strategy - Estrategia a inyectar.
	 * @returns Una nueva instancia de {@link AccessService}.
	 *
	 * @example
	 * ```ts
	 * const flatAccess = AccessService.create(new FlatAccessStrategy());
	 * ```
	 */
	static create(strategy?: IAccessStrategy): AccessService {
		return new AccessService(strategy);
	}

	/**
	 * Intercambia la estrategia de acceso en runtime (Strategy Pattern).
	 *
	 * @param strategy - La nueva estrategia a utilizar.
	 */
	useSetStrategy(strategy: IAccessStrategy): void {
		this.strategy = strategy;
	}

	/** Returns the currently active strategy. */
	useGetStrategy(): IAccessStrategy {
		return this.strategy;
	}

	/**
	 * Effective capabilities of a role (delegado a la estrategia activa).
	 */
	useCapabilitiesFor(role: AccessRole): AccessCapability[] {
		return this.strategy.useCapabilitiesFor(role);
	}

	/**
	 * Registers (or replaces) a role definition (delegado a la estrategia activa).
	 */
	useRegisterRole(definition: AccessRoleDefinition): void {
		this.strategy.useRegisterRole(definition);
	}

	/** Restores the built-in role registry (delegado a la estrategia activa). */
	useResetRoles(): void {
		this.strategy.useResetRoles();
	}

	/** Lists every registered role definition (delegado a la estrategia activa). */
	useRoles(): AccessRoleDefinition[] {
		return this.strategy.useRoles();
	}

	/** Exact role membership - no hierarchy involved. */
	useHasRole(subject: AccessSubject, role: AccessRole): boolean {
		return this.strategy.useHasRole(subject, role);
	}

	/**
	 * Whether the subject may perform a capability (delegado a la estrategia activa).
	 */
	useCan(subject: AccessSubject, capability: AccessCapability): boolean {
		return this.strategy.useCan(subject, capability);
	}
}

/* -------------------------------------------------------------------------- */
/* Wrappers (backward compatibility)                                          */
/* -------------------------------------------------------------------------- */

/**
 * Effective capabilities of a role: its own plus every less-privileged role's.
 *
 * @example
 * ```ts
 * useCapabilitiesFor("author"); // content:create, content:edit:own, ..., conversations:use
 * useCapabilitiesFor("guest");  // []
 * ```
 */
export function useCapabilitiesFor(role: AccessRole): AccessCapability[] {
	return AccessService.getInstance().useCapabilitiesFor(role);
}

/**
 * Registers (or replaces) a role definition. Use it to extend a built-in
 * role's capabilities, e.g. grant `content:create` to `member`.
 */
export function useRegisterRole(definition: AccessRoleDefinition): void {
	AccessService.getInstance().useRegisterRole(definition);
}

/** Restores the built-in role registry (mainly for tests). */
export function useResetRoles(): void {
	AccessService.getInstance().useResetRoles();
}

/** Lists every registered role definition. Returns copies, not live state. */
export function useRoles(): AccessRoleDefinition[] {
	return AccessService.getInstance().useRoles();
}

/** Exact role membership - no hierarchy involved. */
export function useHasRole(subject: AccessSubject, role: AccessRole): boolean {
	return AccessService.getInstance().useHasRole(subject, role);
}

/**
 * Whether the subject may perform a capability. Any of the subject's roles
 * granting the capability (directly or by inheritance) is enough.
 *
 * @example
 * ```ts
 * useCan({ id: 1, roles: ["author"] }, "content:publish"); // false
 * useCan({ id: 1, roles: ["author"] }, "content:create");  // true
 * useCan({ id: 2, roles: ["editor"] }, "content:create");  // true (inherits author)
 * useCan({ id: 3, roles: [] }, "conversations:use");       // false
 * ```
 */
export function useCan(subject: AccessSubject, capability: AccessCapability): boolean {
	return AccessService.getInstance().useCan(subject, capability);
}
