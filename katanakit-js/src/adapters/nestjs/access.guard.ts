import {
	type CanActivate,
	type ExecutionContext,
	ForbiddenException,
	type Type,
	UnauthorizedException,
} from "@nestjs/common";

import { useCan } from "@/core/services/access.service.js";
import type { AccessCapability, AccessSubject } from "@/types/index.js";

/**
 * Builds a Nest guard that requires an access capability, mirroring the
 * Express `useRequireCapability()` behavior on Nest's exception pipeline.
 *
 * The project ships no auth provider, so the subject is resolved by the caller
 * (JWT, session, API key…). Return `null` for anonymous requests — they get a
 * 401; authenticated but not allowed gets a 403. Both exceptions carry the
 * same `{ ok, data, error }` body shape used across the toolkit.
 *
 * @typeParam TRequest - The platform request type (Express by default).
 * @param capability - The capability required to activate the route.
 * @param resolveSubject - Resolves the access subject from the request.
 * @returns A guard class ready for `@UseGuards(...)`.
 *
 * @example
 * ```ts
 * import { Controller, Get, UseGuards } from "@nestjs/common";
 * import { useRequireCapability } from "katanakit-js/adapters/nestjs";
 *
 * const CanPublish = useRequireCapability(
 *   "content:publish",
 *   (request: { account?: { id: number; roles: string[] } }) => request.account ?? null,
 * );
 *
 * @Controller("articles")
 * export class ArticlesController {
 *   @Get("drafts")
 *   @UseGuards(CanPublish)
 *   drafts() {
 *     return [];
 *   }
 * }
 * ```
 */
export function useRequireCapability<TRequest = unknown>(
	capability: AccessCapability,
	resolveSubject: (request: TRequest) => AccessSubject | null,
): Type<CanActivate> {
	class KatanaCapabilityGuard implements CanActivate {
		canActivate(context: ExecutionContext): boolean {
			const request = context.switchToHttp().getRequest<TRequest>();
			const subject = resolveSubject(request);

			if (!subject) {
				throw new UnauthorizedException({
					ok: false,
					data: null,
					error: { message: "Authentication required", status: 401 },
				});
			}

			let allowed: boolean;
			try {
				allowed = useCan(subject, capability);
			} catch {
				// Malformed subject or unknown role: fail closed at the HTTP boundary.
				allowed = false;
			}

			if (!allowed) {
				throw new ForbiddenException({
					ok: false,
					data: null,
					error: { message: `Missing capability: ${capability}`, status: 403 },
				});
			}

			return true;
		}
	}

	return KatanaCapabilityGuard;
}
