import { type DynamicModule, Module } from "@nestjs/common";

import { KatanaKitService } from "./kit.service.js";
import { KATANA_KIT_OPTIONS, type KatanaKitModuleOptions } from "./options.js";

/**
 * Wires KatanaKit into a Nest application.
 *
 * `forRoot()` registers the APIs (and optionally the shared query client) at
 * bootstrap and exposes an injectable {@link KatanaKitService}. The module is
 * global by default so feature modules do not need to import it again; pass
 * `global: false` to scope it explicitly.
 *
 * @example
 * ```ts
 * import { Module } from "@nestjs/common";
 * import { KatanaKitModule } from "katanakit-js/adapters/nestjs";
 *
 * @Module({
 *   imports: [
 *     KatanaKitModule.forRoot({
 *       apis: {
 *         pokeapi: {
 *           baseUri: "https://pokeapi.co/api/v2",
 *           endpoints: { pokemonById: "/pokemon/:id/" },
 *         },
 *       },
 *     }),
 *   ],
 * })
 * export class AppModule {}
 * ```
 */
@Module({})
export class KatanaKitModule {
	/** Creates the dynamic module with the toolkit providers. */
	static forRoot(options: KatanaKitModuleOptions = {}): DynamicModule {
		return {
			module: KatanaKitModule,
			global: options.global ?? true,
			providers: [KatanaKitService, { provide: KATANA_KIT_OPTIONS, useValue: options }],
			exports: [KatanaKitService],
		};
	}
}
