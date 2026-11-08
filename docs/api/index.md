# katanakit-js

## Classes

| Class | Description |
| ------ | ------ |
| [AccessService](classes/AccessService.md) | AccessService - Singleton facade con Strategy Pattern. |
| [AgentConfigService](classes/AgentConfigService.md) | AgentConfigService — Singleton facade for per-agent configuration emission. |
| [AgentService](classes/AgentService.md) | AgentService - Singleton facade con Strategy Pattern. |
| [ArrayService](classes/ArrayService.md) | `ArrayService` — singleton facade for collection helpers. |
| [AssistantService](classes/AssistantService.md) | AssistantService - Singleton para el asistente conversacional. |
| [AuthService](classes/AuthService.md) | Holds the providers a deployment has configured and routes a request to one. |
| [CurrencyConverterService](classes/CurrencyConverterService.md) | CurrencyConverterService — Singleton facade for currency conversion against **external exchange rates**. |
| [DatesService](classes/DatesService.md) | DatesService - Singleton para operaciones de fechas. |
| [DirectoryService](classes/DirectoryService.md) | User management over any storage, with the lockout guards built in. |
| [ErrorService](classes/ErrorService.md) | ErrorService — Singleton facade over error creation and normalization. |
| [FakerService](classes/FakerService.md) | FakerService — generic fake data for tests, seeds and forms. |
| [FetchApiManager](classes/FetchApiManager.md) | FetchApiManager - Singleton para el registro de APIs y peticiones HTTP. |
| [FlatAccessStrategy](classes/FlatAccessStrategy.md) | Estrategia estricta: sólo verifica capacidades declaradas explícitamente en el rol del sujeto, sin her jerarquía. Útil cuando cada rol debe declarar todo lo que puede hacer. |
| [FormatterService](classes/FormatterService.md) | FormatterService — Singleton facade over `Intl.NumberFormat`, locale-aware casing and `JSON`. |
| [FrankfurterCurrencyProvider](classes/FrankfurterCurrencyProvider.md) | FrankfurterCurrencyProvider — rate source over **Frankfurter**, the open source (MIT) API for European Central Bank reference rates. No API key, no quota. |
| [GeneratorService](classes/GeneratorService.md) | GeneratorService — Singleton facade for numeric ids, UUIDs, slugs, tokens and PBKDF2 hashing. |
| [GeometryAreaService](classes/GeometryAreaService.md) | GeometryAreaService — pure area calculations for geometric shapes. All methods are stateless — input → formatted string only. |
| [GeometryPerimeterService](classes/GeometryPerimeterService.md) | GeometryPerimeterService — pure perimeter calculations for geometric shapes. All methods are stateless — input → formatted string only. |
| [GeometryVolumeService](classes/GeometryVolumeService.md) | GeometryVolumeService — pure volume calculations for 3D geometric shapes. All methods are stateless — input → formatted string only. |
| [HierarchicalAccessStrategy](classes/HierarchicalAccessStrategy.md) | Estrategia por defecto: control de acceso jerárquico basado en roles registrados. Es la estrategia estándar del servicio. |
| [KeyVaultService](classes/KeyVaultService.md) | KeyVaultService — Singleton facade for API key record lifecycle. |
| [LoggerService](classes/LoggerService.md) | LoggerService - Singleton para logging Aplica el patrón Singleton para garantizar una única instancia de logger. |
| [McpService](classes/McpService.md) | McpService — Singleton facade for MCP server registry management and host-config emission. |
| [MediaService](classes/MediaService.md) | MediaService — Singleton facade over media source parsing and embed markup generation (YouTube, Vimeo and direct video files). |
| [OpenAiCompatibleStrategy](classes/OpenAiCompatibleStrategy.md) | Estrategia por defecto: proveedor compatible con OpenAI (`POST /chat/completions` con Bearer token). Cubre DashScope en modo compatible, OpenAI, Azure OpenAI y la mayoría de endpoints self-hosted. |
| [QueryClientFactory](classes/QueryClientFactory.md) | QueryClientFactory - Factory Pattern para crear instancias de QueryClient. |
| [QueryService](classes/QueryService.md) | QueryService - Singleton para el QueryClient compartido. |
| [ReactiveService](classes/ReactiveService.md) | ReactiveService — Singleton facade over fine-grained reactivity: signals, effects, memos and batching. |
| [ResultService](classes/ResultService.md) | ResultService — Singleton facade for Safe Result creation at service boundaries. |
| [TimingService](classes/TimingService.md) | TimingService — Singleton facade for timers, intervals, debounce/throttle and promise races. |
| [UnitConverterService](classes/UnitConverterService.md) | UnitConverterService — Singleton facade for physical unit conversions. |
| [UtilsService](classes/UtilsService.md) | UtilsService - Singleton para utilidades genéricas. |
| [ValidationService](classes/ValidationService.md) | ValidationService - Singleton para validaciones. |
| [VaultStore](classes/VaultStore.md) | Encrypted vault persistence: scrypt key derivation + AES-256-GCM, versioned envelope, atomic writes. |
| [YoutubeService](classes/YoutubeService.md) | YoutubeService — Singleton facade over the YouTube Data API v3 and the keyless channel RSS feed. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [AgentConfigFile](interfaces/AgentConfigFile.md) | One file the auto-configuration would write. |
| [AgentConfigInput](interfaces/AgentConfigInput.md) | Input accepted when emitting agent configuration. |
| [AgentConfigManualEntry](interfaces/AgentConfigManualEntry.md) | One "manual connection" line (env export, endpoint, …). |
| [AgentConfigOutput](interfaces/AgentConfigOutput.md) | Output of agent config emission: files, manual entries and safety notes. |
| [AgentDefinition](interfaces/AgentDefinition.md) | A coding tool whose configuration the key manager can generate. |
| [AgentRunOptions](interfaces/AgentRunOptions.md) | Options for running the tool-calling agent loop. |
| [AiChatOptions](interfaces/AiChatOptions.md) | Options for a single chat completion. |
| [AiTool](interfaces/AiTool.md) | A tool the agent can invoke. `parameters` is a JSON Schema object describing the expected input. |
| [ApiEntry](interfaces/ApiEntry.md) | - |
| [AssistantInitConfig](interfaces/AssistantInitConfig.md) | Configuration for the assistant facade. |
| [AssistantReplyOptions](interfaces/AssistantReplyOptions.md) | Options for a single assistant reply. |
| [AstroPath](interfaces/AstroPath.md) | - |
| [AuthError](interfaces/AuthError.md) | Why a provider could not answer. |
| [BatteryManager](interfaces/BatteryManager.md) | Type for the experimental Battery API. |
| [CacheDecoratorOptions](interfaces/CacheDecoratorOptions.md) | CacheDecorator - Decorator Pattern para caché de resultados. |
| [CollectionEntryLike](interfaces/CollectionEntryLike.md) | Minimal shape of an Astro content collection entry. |
| [ConversationStore](interfaces/ConversationStore.md) | Persistence contract for assistant conversations. |
| [CurrencyConverterServiceOptions](interfaces/CurrencyConverterServiceOptions.md) | Wiring options for [CurrencyConverterService](classes/CurrencyConverterService.md) (dependency injection). |
| [CurrencyRateEvents](interfaces/CurrencyRateEvents.md) | Observer callbacks fired by [ICurrencyConverterService](interfaces/ICurrencyConverterService.md). |
| [DatesServiceTypes](interfaces/DatesServiceTypes.md) | Contract of the dates facade. |
| [DirectoryActor](interfaces/DirectoryActor.md) | Actions that lock every administrator out of their own system. |
| [DirectoryError](interfaces/DirectoryError.md) | - |
| [DirectoryRepository](interfaces/DirectoryRepository.md) | Where user records actually live. |
| [DirectoryServiceOptions](interfaces/DirectoryServiceOptions.md) | - |
| [FetchOptions](interfaces/FetchOptions.md) | Options passed when executing a fetch request. |
| [FetchRequest](interfaces/FetchRequest.md) | Mutable request inputs passed through registered HTTP request interceptors. |
| [FrankfurterCurrencyProviderOptions](interfaces/FrankfurterCurrencyProviderOptions.md) | Wiring options for [FrankfurterCurrencyProvider](classes/FrankfurterCurrencyProvider.md). |
| [GrantAwareOptions](interfaces/GrantAwareOptions.md) | - |
| [IAccessService](interfaces/IAccessService.md) | Contract of the access-control facade. Pure, no I/O. |
| [IAccessStrategy](interfaces/IAccessStrategy.md) | Estrategia de verificación de acceso - Strategy Pattern. |
| [IAiProviderStrategy](interfaces/IAiProviderStrategy.md) | Estrategia de proveedor AI - Strategy Pattern. |
| [IAiService](interfaces/IAiService.md) | Contract of the AI/agent facade. |
| [IAppUtils](interfaces/IAppUtils.md) | Contract of the app utilities facade. |
| [IAssistantService](interfaces/IAssistantService.md) | Contract of the assistant facade. |
| [IAstroService](interfaces/IAstroService.md) | Contract of the Astro facade. |
| [IAuthProvider](interfaces/IAuthProvider.md) | An identity provider the kit can ask *"who is this?"*. |
| [IConverterService](interfaces/IConverterService.md) | Contract of the unit converter facade. |
| [ICryptoStrategy](interfaces/ICryptoStrategy.md) | Contract for a crypto strategy. |
| [ICurrencyConverterService](interfaces/ICurrencyConverterService.md) | Contract of the currency conversion facade. |
| [ICurrencyRateProvider](interfaces/ICurrencyRateProvider.md) | Port for fetching exchange rates from an external source. |
| [IDataUtils](interfaces/IDataUtils.md) | Contract of the data utilities. |
| [IDomService](interfaces/IDomService.md) | Contract of the DOM facade. |
| [IFetchApiManager](interfaces/IFetchApiManager.md) | Contract of the fetch facade. |
| [IFormatterService](interfaces/IFormatterService.md) | Contract of the formatter facade. |
| [INotionService](interfaces/INotionService.md) | Contract of the Notion adapter facade. |
| [IntervalControl](interfaces/IntervalControl.md) | Control object returned by interval operations. |
| [IReactiveService](interfaces/IReactiveService.md) | Contract of the reactive facade. |
| [IRssService](interfaces/IRssService.md) | Contract of the RSS facade. |
| [ISystemUtils](interfaces/ISystemUtils.md) | Contract of the system utilities. |
| [IThemeService](interfaces/IThemeService.md) | Contract of the theme facade. |
| [IUuidStrategy](interfaces/IUuidStrategy.md) | Contract for a UUID strategy. |
| [IWordPressService](interfaces/IWordPressService.md) | Contract of the WordPress adapter facade. |
| [KeyRecordInput](interfaces/KeyRecordInput.md) | Input accepted when creating a key record (id/status/timestamps are assigned). |
| [NotionFilter](interfaces/NotionFilter.md) | Filter for querying a Notion database. |
| [ObserverConfig](interfaces/ObserverConfig.md) | Configuration for a registered IntersectionObserver. |
| [ObserverEntry](interfaces/ObserverEntry.md) | Internal registry entry storing an observer instance and its tracked targets. |
| [OpenCodeMcpServer](interfaces/OpenCodeMcpServer.md) | The `mcp.servers` value shape OpenCode accepts for one server. Only the fields this kit stores are emitted; every field is optional except `type` because local and remote servers use disjoint keys. |
| [PaginationProps](interfaces/PaginationProps.md) | - |
| [PathsOptions](interfaces/PathsOptions.md) | - |
| [ResourceAccessDecision](interfaces/ResourceAccessDecision.md) | - |
| [SalePrice](interfaces/SalePrice.md) | Result of [useSalePrice](functions/useSalePrice.md): the regular price, the discounted price and the rounded percentage taken off. |
| [ScrollOptions](interfaces/ScrollOptions.md) | Options for scrolling operations. |
| [SeoMetaArticle](interfaces/SeoMetaArticle.md) | Article Open Graph extensions (`og:type=article`). |
| [SeoMetaFlat](interfaces/SeoMetaFlat.md) | Flat meta: HTML head essentials, Open Graph and optional Twitter/X cards. |
| [SeoOgImageObject](interfaces/SeoOgImageObject.md) | Open Graph image (string URL or object). |
| [SeoRobotsObject](interfaces/SeoRobotsObject.md) | Robots as string or simple object. |
| [SeoTagNode](interfaces/SeoTagNode.md) | - |
| [SignalGetter](interfaces/SignalGetter.md) | - |
| [SiteConfig](interfaces/SiteConfig.md) | Site-wide configuration for KatanaKit SEO / RSS helpers. Framework-agnostic — reuse in Vanilla, Astro, Vue/React SPAs, Express, etc. |
| [StorageStrategy](interfaces/StorageStrategy.md) | Strategy contract: homogeneous storage without `any`. |
| [Subscribable](interfaces/Subscribable.md) | - |
| [ThemeOptions](interfaces/ThemeOptions.md) | - |
| [TimeoutControl](interfaces/TimeoutControl.md) | Control object returned by timeout operations. |
| [ToggleSignalSetter](interfaces/ToggleSignalSetter.md) | - |
| [UrlOptions](interfaces/UrlOptions.md) | - |
| [ValidationSchema](interfaces/ValidationSchema.md) | Schema-agnostic contract. Accepts Zod (`safeParse`), Valibot (`safeParse`), Standard Schema (`~standard.validate`), Yup (`validateSync`) or any object exposing one of those members. |
| [WorkerPoolEntry](interfaces/WorkerPoolEntry.md) | - |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [AccessCapability](type-aliases/AccessCapability.md) | A namespaced capability, `<domain>:<action>[:<scope>]`. |
| [AccessResource](type-aliases/AccessResource.md) | Anything the authorization layer can check a subject against. |
| [AccessRole](type-aliases/AccessRole.md) | A role slug. Closed vocabulary by convention (`BuiltInRole`), open by schema: `useRegisterRole` takes any slug matching the pattern. |
| [AccessRoleDefinition](type-aliases/AccessRoleDefinition.md) | A role definition: slug, label, hierarchy rank and the capabilities it grants. |
| [AccessSource](type-aliases/AccessSource.md) | Where a permission came from. Kept so audit logs can say *why*. |
| [AccessSubject](type-aliases/AccessSubject.md) | Structural subject for access checks. Decoupled from the persistence layer: any object with an id and a role list can be checked (e.g. a Prisma `Account` row, a JWT payload, or a test fixture). Extra keys are preserved, so a subject can also carry the principal it was resolved from. |
| [AgentData](type-aliases/AgentData.md) | Payload returned by a successful [useRunAgent](functions/useRunAgent.md) call. |
| [AgentResult](type-aliases/AgentResult.md) | Safe result of an agent run. |
| [AgentStep](type-aliases/AgentStep.md) | One round of tool execution inside the agent loop. |
| [AiError](type-aliases/AiError.md) | Safe error returned on non-2xx or network failures. |
| [AiFunctionCall](type-aliases/AiFunctionCall.md) | Function invocation requested by the model when using tools. |
| [AiMessage](type-aliases/AiMessage.md) | A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose: they mirror the OpenAI-compatible protocol so messages pass through unchanged. |
| [AiProviderConfig](type-aliases/AiProviderConfig.md) | Provider configuration for an OpenAI-compatible chat/agent endpoint. |
| [AiResult](type-aliases/AiResult.md) | Safe result (discriminated union) without throwing. |
| [AiRole](type-aliases/AiRole.md) | Role of a chat message in the OpenAI-compatible protocol. |
| [AiToolCall](type-aliases/AiToolCall.md) | A single tool call emitted by the model (OpenAI-compatible wire shape). |
| [ApiConfigValue](type-aliases/ApiConfigValue.md) | Values accepted by [defineApiConfig](functions/defineApiConfig.md): an [ApiEntry](interfaces/ApiEntry.md), a boolean flag (kept on `config` only — never registered as an API) or a method. |
| [ApiError](type-aliases/ApiError.md) | Structure of the safe error returned on non-2xx or network failures. |
| [ApisConfig](type-aliases/ApisConfig.md) | - |
| [AppDateFormatOptions](type-aliases/AppDateFormatOptions.md) | - |
| [AssistantReply](type-aliases/AssistantReply.md) | Payload returned by a successful assistant reply. |
| [AssistantResult](type-aliases/AssistantResult.md) | Safe result of an assistant reply. |
| [AstroServiceError](type-aliases/AstroServiceError.md) | - |
| [AstroServiceResult](type-aliases/AstroServiceResult.md) | Safe Result (discriminated union without throwing). |
| [AuthRequestLike](type-aliases/AuthRequestLike.md) | Anything that carries the headers of an inbound request. |
| [AuthResult](type-aliases/AuthResult.md) | Safe result of an authentication step. |
| [BuiltInCapability](type-aliases/BuiltInCapability.md) | Capabilities the kit ships with. A convenience alias for autocomplete — the schema itself accepts any `<domain>:<action>[:<scope>]` string. |
| [BuiltInRole](type-aliases/BuiltInRole.md) | Role slugs the kit ships with. A convenience alias for autocomplete — the schema itself accepts any slug, and deployments register their own. |
| [ConfigData](type-aliases/ConfigData.md) | The props/booleans half of a `define*Config` literal — the config data. |
| [ConfigFacade](type-aliases/ConfigFacade.md) | What every `define*Config` returns: the registered config under `config`, plus the methods declared alongside it so `this.config` resolves inside them. |
| [ConfigMethod](type-aliases/ConfigMethod.md) | Any method a consumer declares inline in a `define*Config` literal. Written with `function` (never an arrow) so `this` resolves to the facade. |
| [ConfigMethodEntries](type-aliases/ConfigMethodEntries.md) | The methods half of a `define*Config` literal. |
| [ConfigMethodKeys](type-aliases/ConfigMethodKeys.md) | Keys of `T` whose value is a [ConfigMethod](type-aliases/ConfigMethod.md). Methods declared as optional are still detected (`NonNullable`), so they are split out of the config half rather than leaking into it. |
| [ConfigValues](type-aliases/ConfigValues.md) | Constrains every non-method entry of a `define*Config` literal to `V`, while leaving method entries untouched. Pair with `NoInfer<T>` in the signature so it validates without stealing inference from the literal. |
| [Currency](type-aliases/Currency.md) | - |
| [CurrencyConversion](type-aliases/CurrencyConversion.md) | Result of a currency conversion: the math plus the rate and date it came from. |
| [CurrencyConvertOptions](type-aliases/CurrencyConvertOptions.md) | Input for a currency conversion between two ISO currencies. |
| [CurrencyFormatOptions](type-aliases/CurrencyFormatOptions.md) | - |
| [CurrencyRateSnapshot](type-aliases/CurrencyRateSnapshot.md) | A dated snapshot of exchange rates quoted against one base currency. |
| [DateFormatOptions](type-aliases/DateFormatOptions.md) | Backwards-compatible alias for [AppDateFormatOptions](type-aliases/AppDateFormatOptions.md). |
| [DateOrder](type-aliases/DateOrder.md) | Relative ordering of two dates. |
| [DateUnit](type-aliases/DateUnit.md) | Granularity accepted by the calendar arithmetic helpers. |
| [DirectoryErrorCode](type-aliases/DirectoryErrorCode.md) | - |
| [DirectoryPage](type-aliases/DirectoryPage.md) | - |
| [DirectoryPageResult](type-aliases/DirectoryPageResult.md) | Shape a repository must satisfy — lets a plain object be passed as one. |
| [DirectoryQuery](type-aliases/DirectoryQuery.md) | - |
| [DirectoryResult](type-aliases/DirectoryResult.md) | Safe result of a directory operation. Never throws for a refused action. |
| [DirectoryUser](type-aliases/DirectoryUser.md) | - |
| [EncryptedVault](type-aliases/EncryptedVault.md) | Encrypted vault file as stored on disk. |
| [FakeVehicle](type-aliases/FakeVehicle.md) | Generic fake vehicle returned by `useFakeVehicle`. |
| [FetchResult](type-aliases/FetchResult.md) | Safe result, discriminated union (Astro Actions style) without throwing. The `ok` flag narrows the union between the success and error branches. |
| [FieldErrors](type-aliases/FieldErrors.md) | A single field-level validation message keyed by field name. |
| [FileEncoding](type-aliases/FileEncoding.md) | Text encodings accepted by the filesystem helpers. |
| [FileHashAlgorithm](type-aliases/FileHashAlgorithm.md) | Hash algorithms supported by `useHashFile` / `useVerifyFileHash`. |
| [FileStats](type-aliases/FileStats.md) | Portable stats subset returned by `useGetFileStats`. |
| [FilesystemError](type-aliases/FilesystemError.md) | Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped). |
| [FilesystemResult](type-aliases/FilesystemResult.md) | Safe Result for filesystem operations: `{ data, error, ok }`, never throws. |
| [FormDataValues](type-aliases/FormDataValues.md) | Flat `name` → value map read from a native `FormData`, with dotted names expanded into nested objects (`"address.city"` → `{ address: { city } }`) so field names line up with a nested Zod schema. |
| [FormSubmitHandler](type-aliases/FormSubmitHandler.md) | Receives the parsed, typed values once validation passes. May be async; the adapters keep the submit button busy until it settles. |
| [FormValidation](type-aliases/FormValidation.md) | Outcome of validating a native form: the parsed values, or the per-field messages that blocked them. Both shapes carry `errors` so the caller can render an empty map on success without a branch. |
| [GeometryFormatOptions](type-aliases/GeometryFormatOptions.md) | Options for number formatting in geometry calculations. |
| [GeoPosition](type-aliases/GeoPosition.md) | Represents a geographic position with latitude, longitude and accuracy. |
| [Grant](type-aliases/Grant.md) | A role scoped to one resource. |
| [GrantResolver](type-aliases/GrantResolver.md) | Supplies the roles a subject holds over one resource. |
| [HttpMethod](type-aliases/HttpMethod.md) | - |
| [Identity](type-aliases/Identity.md) | A person in your system. |
| [IdentityStatus](type-aliases/IdentityStatus.md) | Account lifecycle state you own. |
| [IfConfig](type-aliases/IfConfig.md) | Config for the InsForge adapter. InsForge is the database fallback (primary data layer is Cloudflare); storage and edge functions are also available through the same client. |
| [IfInsertRows](type-aliases/IfInsertRows.md) | Rows for insert (one or many). |
| [IfInvokeOptions](type-aliases/IfInvokeOptions.md) | Edge function invocation. |
| [IfListOptions](type-aliases/IfListOptions.md) | Options for listing bucket objects. |
| [IfOrder](type-aliases/IfOrder.md) | Sort clause for table queries. |
| [IfRpcCall](type-aliases/IfRpcCall.md) | Postgres function (RPC) call. |
| [IfStorageRef](type-aliases/IfStorageRef.md) | Bucket + object key reference for storage operations. |
| [IfTableQuery](type-aliases/IfTableQuery.md) | Options for a table read. Filters map to equality clauses. |
| [IfUpdatePatch](type-aliases/IfUpdatePatch.md) | Patch for update (must be paired with filters — mass updates are refused). |
| [IfWriteQuery](type-aliases/IfWriteQuery.md) | Options for an update or delete. Filters are REQUIRED (no mass writes). |
| [ISerializedError](type-aliases/ISerializedError.md) | Serialized error shape. |
| [KeyRecord](type-aliases/KeyRecord.md) | One API key record as stored in the vault. |
| [KeyStatus](type-aliases/KeyStatus.md) | Lifecycle status of a stored API key. |
| [LazyLoaderEntry](type-aliases/LazyLoaderEntry.md) | Internal registry entry for lazy loading configurations. |
| [Locale](type-aliases/Locale.md) | - |
| [LogLevel](type-aliases/LogLevel.md) | Native console methods used as log levels. |
| [McpServerEntry](type-aliases/McpServerEntry.md) | One MCP server registry entry. |
| [McpServerInput](type-aliases/McpServerInput.md) | Input accepted when creating an MCP server entry. |
| [MediaProvider](type-aliases/MediaProvider.md) | Where a media source comes from. `file` = direct mp4/webm (native `<video>`). |
| [MediaSource](type-aliases/MediaSource.md) | Normalized media source: provider + stable id or direct src. |
| [NotionBlock](type-aliases/NotionBlock.md) | A Notion block object. |
| [NotionBlockList](type-aliases/NotionBlockList.md) | Result of listing block children (paginated). |
| [NotionConfig](type-aliases/NotionConfig.md) | Configuration for the Notion API integration. |
| [NotionCover](type-aliases/NotionCover.md) | Cover image on a page. |
| [NotionDatabase](type-aliases/NotionDatabase.md) | A Notion database object. |
| [NotionDatabaseQuery](type-aliases/NotionDatabaseQuery.md) | Query options for a Notion database. |
| [NotionIcon](type-aliases/NotionIcon.md) | Icon on a page or database (emoji or file). |
| [NotionPage](type-aliases/NotionPage.md) | A Notion page object. |
| [NotionPageList](type-aliases/NotionPageList.md) | Result of querying a Notion database (paginated). |
| [NotionParent](type-aliases/NotionParent.md) | Parent reference for pages and databases. |
| [NotionProperty](type-aliases/NotionProperty.md) | Property value on a Notion page. |
| [NotionPropertySchema](type-aliases/NotionPropertySchema.md) | Schema definition for a database property. |
| [NotionRichText](type-aliases/NotionRichText.md) | Rich text object used in Notion blocks and properties. |
| [NotionSearchQuery](type-aliases/NotionSearchQuery.md) | Search query options for the Notion API. |
| [NotionSearchResult](type-aliases/NotionSearchResult.md) | Result of a Notion search (paginated). |
| [NotionSort](type-aliases/NotionSort.md) | Sort option for querying a Notion database. |
| [NotionUser](type-aliases/NotionUser.md) | A Notion user object. |
| [NotionUserList](type-aliases/NotionUserList.md) | Paginated list of Notion users. |
| [NumberFormatOptions](type-aliases/NumberFormatOptions.md) | - |
| [ObserverCallback](type-aliases/ObserverCallback.md) | Callback invoked when an observed element enters the viewport. |
| [ObserverTarget](type-aliases/ObserverTarget.md) | Target can be either an HTMLElement reference or a CSS selector string. |
| [PathParams](type-aliases/PathParams.md) | - |
| [Principal](type-aliases/Principal.md) | The authenticated subject, as reported by an identity provider. |
| [ProductType](type-aliases/ProductType.md) | - |
| [QueryParams](type-aliases/QueryParams.md) | - |
| [ReadDirEntry](type-aliases/ReadDirEntry.md) | A single directory entry returned by `useReadDir`. |
| [ReadDirOptions](type-aliases/ReadDirOptions.md) | Options for `useReadDir`. |
| [RequestInterceptor](type-aliases/RequestInterceptor.md) | Inspects or modifies a request before fetch; interceptors run in registration order. |
| [RssConfig](type-aliases/RssConfig.md) | Configuration for generating an RSS feed. |
| [RssItem](type-aliases/RssItem.md) | A single item in an RSS feed. |
| [RssResult](type-aliases/RssResult.md) | Result of an RSS generation attempt. |
| [SafeResult](type-aliases/SafeResult.md) | Generic Safe Result discriminated union (Astro Actions style): the `ok` flag narrows between the success and error branches and nothing is thrown. |
| [SalePriceOptions](type-aliases/SalePriceOptions.md) | - |
| [ScrollPosition](type-aliases/ScrollPosition.md) | Represents scroll position. |
| [SeoArrayable](type-aliases/SeoArrayable.md) | - |
| [SeoBooleanable](type-aliases/SeoBooleanable.md) | Slim SEO types: typical HTML meta + Open Graph (Facebook) only. CamelCase keys map to `<title>` / `<meta>` / `<link rel="canonical">`. |
| [SeoMetaInput](type-aliases/SeoMetaInput.md) | Flat meta input (all keys optional / nullable). |
| [SeoTagResult](type-aliases/SeoTagResult.md) | Result of [useSeoMeta](functions/useSeoMeta.md): `html` / `tags` for the head, plus **one** flat object of resolved fields (site + HTML + OG + Twitter). No duplicate `title` / `meta.title` / `config.title`. |
| [SignalListener](type-aliases/SignalListener.md) | - |
| [SignalSetter](type-aliases/SignalSetter.md) | - |
| [SmartVideoOptions](type-aliases/SmartVideoOptions.md) | Input for [useBuildVideoEmbed](functions/useBuildVideoEmbed.md) (core) — one `src`, unified output. |
| [StorageTarget](type-aliases/StorageTarget.md) | - |
| [TemporalInput](type-aliases/TemporalInput.md) | - |
| [ThemeMode](type-aliases/ThemeMode.md) | - |
| [UseSeoMetaBase](type-aliases/UseSeoMetaBase.md) | Site + HTML + OG fields in one object (before Omit). |
| [UseSeoMetaOptions](type-aliases/UseSeoMetaOptions.md) | Public options for [useSeoMeta](functions/useSeoMeta.md). HTML, Open Graph, Twitter/X card and site fields in one object. Omit keys you do not want in the type. |
| [ValidationIssue](type-aliases/ValidationIssue.md) | Minimal issue shape (`error.issues` entries). |
| [ValidationParseResult](type-aliases/ValidationParseResult.md) | Minimal Zod-like success/failure result (`schema.safeParse`). |
| [VaultData](type-aliases/VaultData.md) | Decrypted vault payload — the complete state of the key manager. |
| [ViewportSize](type-aliases/ViewportSize.md) | Represents viewport dimensions. |
| [WatchCallback](type-aliases/WatchCallback.md) | Watch callback taken from the native Vue `watch`. Any internal function is accepted: sync or async, with `(newValue, oldValue)` args or with no args at all (e.g. `() => checkValidations()`). |
| [WatchOptions](type-aliases/WatchOptions.md) | Watch options taken from the native Vue `watch`. `deep` defaults to `true` in `useKatanaWatch`. |
| [WatchSource](type-aliases/WatchSource.md) | Watch source taken from the native Vue `watch` (`ref`, reactive object, getter function or array of those). |
| [WatchStopHandle](type-aliases/WatchStopHandle.md) | Stop function taken from the native Vue `watch`. |
| [WordPressAuth](type-aliases/WordPressAuth.md) | Authentication methods for WordPress. |
| [WordPressConfig](type-aliases/WordPressConfig.md) | Configuration for the WordPress REST API integration. |
| [WorkerFunc](type-aliases/WorkerFunc.md) | - |
| [WpAcfFields](type-aliases/WpAcfFields.md) | Container for ACF (Advanced Custom Fields) fields on a WordPress entity. |
| [WpBaseEntity](type-aliases/WpBaseEntity.md) | Base fields shared by all WordPress entities. |
| [WpBatchOperation](type-aliases/WpBatchOperation.md) | A batch operation for the WordPress REST API. |
| [WpBatchResult](type-aliases/WpBatchResult.md) | Result of a WordPress batch operation. |
| [WpCapability](type-aliases/WpCapability.md) | A WordPress capability name (`edit_orders`). |
| [WpCapabilityMap](type-aliases/WpCapabilityMap.md) | Capability map as WordPress reports it (`{ manage_options: true }`). |
| [WpCategory](type-aliases/WpCategory.md) | A WordPress category. |
| [WpCategoryCreate](type-aliases/WpCategoryCreate.md) | Payload for creating a WordPress category. |
| [WpCategoryUpdate](type-aliases/WpCategoryUpdate.md) | Payload for updating a WordPress category. |
| [WpComment](type-aliases/WpComment.md) | A WordPress comment. |
| [WpCommentCreate](type-aliases/WpCommentCreate.md) | Payload for creating a WordPress comment. |
| [WpCommentUpdate](type-aliases/WpCommentUpdate.md) | Payload for updating a WordPress comment. |
| [WpEmbedded](type-aliases/WpEmbedded.md) | Embedded resources returned by WordPress when `_embed` is used. |
| [WpMedia](type-aliases/WpMedia.md) | A WordPress media item (attachment). |
| [WpMediaMeta](type-aliases/WpMediaMeta.md) | Metadata for a media upload. |
| [WpMediaUpdate](type-aliases/WpMediaUpdate.md) | Payload for updating a WordPress media item. |
| [WpPage](type-aliases/WpPage.md) | A WordPress page. |
| [WpPageCreate](type-aliases/WpPageCreate.md) | Payload for creating a WordPress page. |
| [WpPageUpdate](type-aliases/WpPageUpdate.md) | Payload for updating a WordPress page. |
| [WpPost](type-aliases/WpPost.md) | A WordPress post. |
| [WpPostCreate](type-aliases/WpPostCreate.md) | Payload for creating a WordPress post. |
| [WpPostUpdate](type-aliases/WpPostUpdate.md) | Payload for updating a WordPress post. |
| [WpQueryParams](type-aliases/WpQueryParams.md) | Common query parameters for WordPress REST API list endpoints. |
| [WpRoleAudit](type-aliases/WpRoleAudit.md) | A declared role compared against what the live site reports. |
| [WpRoleAuditStatus](type-aliases/WpRoleAuditStatus.md) | Verification outcome of a declared role: `verified`, `partial`, `unverifiable`. |
| [WpRoleDefinition](type-aliases/WpRoleDefinition.md) | A role declaration: the PHP-free replacement for `add_role()`. |
| [WpRoleRegistry](type-aliases/WpRoleRegistry.md) | A declared role registry. |
| [WpTag](type-aliases/WpTag.md) | A WordPress tag. |
| [WpTagCreate](type-aliases/WpTagCreate.md) | Payload for creating a WordPress tag. |
| [WpTagUpdate](type-aliases/WpTagUpdate.md) | Payload for updating a WordPress tag. |
| [WpUser](type-aliases/WpUser.md) | A WordPress user. |
| [WpUserCreate](type-aliases/WpUserCreate.md) | Payload for creating a WordPress user. |
| [WpUserUpdate](type-aliases/WpUserUpdate.md) | Payload for updating a WordPress user. |
| [WriteFileOptions](type-aliases/WriteFileOptions.md) | Options for `useWriteFile` / `useAppendFile`. |
| [YoutubeApiConfig](type-aliases/YoutubeApiConfig.md) | Config for the YouTube service. One GCP project serves all repos. |
| [YoutubeChannelsResponse](type-aliases/YoutubeChannelsResponse.md) | Minimal `channels.list` shape (only what the service reads). |
| [YoutubeEmbedOptions](type-aliases/YoutubeEmbedOptions.md) | Options for the YouTube nocookie embed URL. |
| [YoutubeListParams](type-aliases/YoutubeListParams.md) | Params for [useGetChannelVideos](functions/useGetChannelVideos.md). |
| [YoutubePlaylistItemsResponse](type-aliases/YoutubePlaylistItemsResponse.md) | Minimal `playlistItems.list` shape (only what the service reads). |
| [YoutubeThumbnailQuality](type-aliases/YoutubeThumbnailQuality.md) | Thumbnail quality for `i.ytimg.com`. |
| [YoutubeVideoNormalized](type-aliases/YoutubeVideoNormalized.md) | Normalized video, enriched with player-ready URLs. |
| [YoutubeVideoPage](type-aliases/YoutubeVideoPage.md) | Paginated channel listing result. |
| [YoutubeVideosResponse](type-aliases/YoutubeVideosResponse.md) | Minimal `videos.list` shape (only what the service reads). |
| [YoutubeVideoThumbnails](type-aliases/YoutubeVideoThumbnails.md) | Resolution-keyed thumbnails (all derivable without an API key). |

## Variables

| Variable | Description |
| ------ | ------ |
| [AccessCapabilitySchema](variables/AccessCapabilitySchema.md) | A capability: at least `<domain>:<action>`, optionally `:action:<scope>`. Rejecting a bare word matters — an unscoped `delete` is exactly the ambiguity `content:delete:own` exists to remove. |
| [AccessResourceSchema](variables/AccessResourceSchema.md) | The thing being acted on — enough for the authorization layer to route a check to the right table, and nothing more. |
| [AccessRoleDefinitionSchema](variables/AccessRoleDefinitionSchema.md) | A role definition. |
| [AccessRoleSchema](variables/AccessRoleSchema.md) | A role slug: lowercase, and made of alphanumeric words joined by `_`, `.` or `-`. The format is enforced so a typo fails loudly at the schema boundary instead of silently granting nothing. |
| [AccessSubjectSchema](variables/AccessSubjectSchema.md) | Structural subject for access checks. Decoupled from the persistence layer: any object with an id and a role list can be checked (e.g. a Prisma `Account` row, a JWT payload, or a test fixture). |
| [AGENT\_DEFINITIONS](variables/AGENT_DEFINITIONS.md) | The agent registry: every coding tool whose configuration this kit can generate. Adding a tool means adding one entry here plus one emitter — the dispatch, masking policy and CLI surface pick it up automatically. |
| [AgentDataSchema](variables/AgentDataSchema.md) | Payload returned by a successful `useRunAgent` call. |
| [AgentStepSchema](variables/AgentStepSchema.md) | One round of tool execution inside the agent loop. |
| [AiErrorSchema](variables/AiErrorSchema.md) | Safe error returned on non-2xx or network failures (AI boundary). |
| [AiFunctionCallSchema](variables/AiFunctionCallSchema.md) | Function invocation requested by the model when using tools. |
| [AiMessageSchema](variables/AiMessageSchema.md) | A chat message. `tool_calls` and `tool_call_id` use snake_case on purpose: they mirror the OpenAI-compatible protocol so messages pass through unchanged. |
| [AiProviderConfigSchema](variables/AiProviderConfigSchema.md) | Provider configuration for an OpenAI-compatible chat/agent endpoint. |
| [AiRoleSchema](variables/AiRoleSchema.md) | Role of a chat message in the OpenAI-compatible protocol. |
| [AiToolCallSchema](variables/AiToolCallSchema.md) | A single tool call emitted by the model (OpenAI-compatible wire shape). |
| [ApiErrorSchema](variables/ApiErrorSchema.md) | Safe error returned on non-2xx, network or validation failures. |
| [AppDateFormatOptionsSchema](variables/AppDateFormatOptionsSchema.md) | Date format parts (subset of `Intl.DateTimeFormatOptions`). |
| [assistant](variables/assistant.md) | Object facade implementing [IAssistantService](interfaces/IAssistantService.md) over the singleton. |
| [AssistantReplySchema](variables/AssistantReplySchema.md) | Payload returned by a successful assistant reply. |
| [AstroServiceErrorSchema](variables/AstroServiceErrorSchema.md) | Error shape for Astro content operations. |
| [BUILT\_IN\_CAPABILITIES](variables/BUILT_IN_CAPABILITIES.md) | Capabilities that ship with the kit. Namespaced as `<domain>:<action> [:<scope>]`; the scope suffix is what keeps `edit:own` and `edit:any` from being confused. Open-ended by design — a deployment that needs `expediente:firmar` or `nomina:aprobar` registers its own. |
| [BUILT\_IN\_ROLE\_SLUGS](variables/BUILT_IN_ROLE_SLUGS.md) | Role slugs that ship with the kit, ordered from most to least privileged. |
| [CurrencyConversionSchema](variables/CurrencyConversionSchema.md) | Result of a conversion: the math plus the rate and date it came from. |
| [CurrencyConvertOptionsSchema](variables/CurrencyConvertOptionsSchema.md) | Options for a currency conversion between two ISO currencies. |
| [CurrencyFormatOptionsSchema](variables/CurrencyFormatOptionsSchema.md) | Options for currency formatting. |
| [CurrencyRateSnapshotSchema](variables/CurrencyRateSnapshotSchema.md) | A dated snapshot of exchange rates quoted against one base currency. |
| [CurrencySchema](variables/CurrencySchema.md) | Supported ISO currency codes. |
| [DateOrderSchema](variables/DateOrderSchema.md) | Relative ordering of two dates, matching Notion's `dateOrder()`. |
| [DateUnitSchema](variables/DateUnitSchema.md) | Granularity of a date calculation, matching Notion's formula vocabulary. |
| [DirectoryErrorCodeSchema](variables/DirectoryErrorCodeSchema.md) | Why an operation was refused. |
| [DirectoryPageSchema](variables/DirectoryPageSchema.md) | A page of results plus the cursor for the next one. |
| [DirectoryQuerySchema](variables/DirectoryQuerySchema.md) | A page request. `cursor` is opaque and provider-defined — the kit neither issues nor interprets it. |
| [DirectoryUserSchema](variables/DirectoryUserSchema.md) | A person as your directory stores them. |
| [EncryptedVaultSchema](variables/EncryptedVaultSchema.md) | Encrypted vault file as it exists on disk. Versioned so a future format can migrate instead of guessing. |
| [FakeVehicleSchema](variables/FakeVehicleSchema.md) | Generic fake vehicle shape returned by `useFakeVehicle`. |
| [FieldErrorsSchema](variables/FieldErrorsSchema.md) | A single field-level validation message keyed by field name. |
| [FileEncodingSchema](variables/FileEncodingSchema.md) | Text encodings accepted by the filesystem helpers. |
| [FileHashAlgorithmSchema](variables/FileHashAlgorithmSchema.md) | Hash algorithms supported by `useHashFile` / `useVerifyFileHash`. |
| [FileStatsSchema](variables/FileStatsSchema.md) | Portable stats subset for a file or directory. |
| [FilesystemErrorSchema](variables/FilesystemErrorSchema.md) | Safe error from a filesystem operation (`NodeJS.ErrnoException`-shaped). |
| [GeometryFormatOptionsSchema](variables/GeometryFormatOptionsSchema.md) | Options for number formatting in geometry calculations. |
| [GeometryUtils](variables/GeometryUtils.md) | Consolidated pure geometry utilities namespace. Groups area, perimeter and volume calculations (no shared mutable state). |
| [GeoPositionSchema](variables/GeoPositionSchema.md) | Represents a geographic position with latitude, longitude and accuracy. |
| [GrantSchema](variables/GrantSchema.md) | A role held over one specific resource — the "share with restricted access" that a content-management role ladder cannot express. |
| [HttpMethodSchema](variables/HttpMethodSchema.md) | HTTP verbs supported by the fetch facade. |
| [IdentitySchema](variables/IdentitySchema.md) | A person **in your system**, as opposed to the principal they log in with. |
| [IdentityStatusSchema](variables/IdentityStatusSchema.md) | Lifecycle of an account you own. |
| [IfBucketSchema](variables/IfBucketSchema.md) | Bucket name. |
| [IfConfigSchema](variables/IfConfigSchema.md) | Config for the InsForge adapter. InsForge is the database fallback (primary data layer is Cloudflare); storage and edge functions are also available through the same client. |
| [IfInsertRowsSchema](variables/IfInsertRowsSchema.md) | Rows for insert (one or many). |
| [IfInvokeOptionsSchema](variables/IfInvokeOptionsSchema.md) | Edge function invocation. |
| [IfListOptionsSchema](variables/IfListOptionsSchema.md) | Options for listing bucket objects. |
| [IfOrderSchema](variables/IfOrderSchema.md) | Sort clause for table queries. |
| [IfRpcCallSchema](variables/IfRpcCallSchema.md) | Postgres function (RPC) call. |
| [IfStorageRefSchema](variables/IfStorageRefSchema.md) | Bucket + object key reference for storage operations. |
| [IfTableNameSchema](variables/IfTableNameSchema.md) | Table name (bare; schema comes from config or query options). |
| [IfTableQuerySchema](variables/IfTableQuerySchema.md) | Options for a table read. Filters map to equality clauses. |
| [IfUpdatePatchSchema](variables/IfUpdatePatchSchema.md) | Patch for update (must be paired with filters — mass updates are refused). |
| [IfWriteQuerySchema](variables/IfWriteQuerySchema.md) | Options for an update or delete. Filters are REQUIRED (no mass writes). |
| [KEY\_STATUSES](variables/KEY_STATUSES.md) | Every status value, ordered from most to least permissive. |
| [KeyProviderSchema](variables/KeyProviderSchema.md) | Provider slug: lowercase alphanumerics joined by `_`, `.` or `-`. The same shape `AccessRoleSchema` enforces, so a provider id can never surprise a downstream consumer with spaces or slashes. |
| [KeyRecordSchema](variables/KeyRecordSchema.md) | One API key as stored in the vault. `secret` only ever lives inside the encrypted payload — presentation layers receive it masked unless the caller explicitly asks to reveal it. |
| [KeyStatusSchema](variables/KeyStatusSchema.md) | Lifecycle status of a stored API key. Revoked keys are kept for audit. |
| [KITT\_BASE\_URL](variables/KITT_BASE_URL.md) | Default endpoint for Alibaba Cloud Model Studio (DashScope) compatible mode. |
| [KITT\_DEFAULT\_MODEL](variables/KITT_DEFAULT_MODEL.md) | Default model for the Kitt assistant preset. |
| [KITT\_SYSTEM\_PROMPT](variables/KITT_SYSTEM_PROMPT.md) | Default system prompt injected when the agent is configured without one. |
| [kittPreset](variables/kittPreset.md) | Reusable preset (base URL + model) for the Kitt assistant. |
| [LazyLoaderEntrySchema](variables/LazyLoaderEntrySchema.md) | Internal registry entry for lazy loading configurations. |
| [LazyNodeCryptoStrategy](variables/LazyNodeCryptoStrategy.md) | Lazy Node.js `crypto` strategy for PBKDF2 hashing — thin adapter over [GeneratorService.useHash](classes/GeneratorService.md#usehash) satisfying [ICryptoStrategy](interfaces/ICryptoStrategy.md). |
| [LocaleSchema](variables/LocaleSchema.md) | Locales with first-class formatting support. |
| [LogLevelSchema](variables/LogLevelSchema.md) | Native console methods used as log levels. |
| [McpServerNameSchema](variables/McpServerNameSchema.md) | MCP server name. Restricted to characters that survive OpenCode's tool-name normalization (`<server>_<tool>`, everything else becomes `_`), so two differently-spelled names can never collapse into the same tool prefix. |
| [McpServerSchema](variables/McpServerSchema.md) | One MCP server. Mirrors the OpenCode `mcp.servers` contract: a `local` server runs a command over stdio, a `remote` server is an absolute Streamable HTTP URL. Credential values use `{env:NAME}` substitution — the vault keeps the real secret, config files keep the reference. |
| [MediaProviderSchema](variables/MediaProviderSchema.md) | Where a media source comes from. `file` = direct mp4/webm (native `<video>`). |
| [MediaSourceSchema](variables/MediaSourceSchema.md) | Normalized media source: provider + stable id or direct src. |
| [NativeUuidStrategy](variables/NativeUuidStrategy.md) | Native UUID strategy using `globalThis.crypto.randomUUID`, with a fallback — thin adapter over [GeneratorService.useUuid](classes/GeneratorService.md#useuuid) satisfying [IUuidStrategy](interfaces/IUuidStrategy.md). |
| [NotionBlockListSchema](variables/NotionBlockListSchema.md) | Result of listing block children (paginated). |
| [NotionBlockResponseSchema](variables/NotionBlockResponseSchema.md) | Single block response (fields may be sparse depending on the endpoint). |
| [NotionBlockSchema](variables/NotionBlockSchema.md) | A Notion block object. |
| [NotionConfigSchema](variables/NotionConfigSchema.md) | Config for the Notion API integration. |
| [NotionCoverSchema](variables/NotionCoverSchema.md) | Cover image on a page. |
| [NotionDatabaseQuerySchema](variables/NotionDatabaseQuerySchema.md) | Query options for a Notion database. |
| [NotionDatabaseResponseSchema](variables/NotionDatabaseResponseSchema.md) | Single database response (fields may be sparse depending on the endpoint). |
| [NotionDatabaseSchema](variables/NotionDatabaseSchema.md) | A Notion database object. |
| [NotionFilterSchema](variables/NotionFilterSchema.md) | Filter for querying a Notion database. |
| [NotionIconSchema](variables/NotionIconSchema.md) | Icon on a page or database (emoji or file). |
| [NotionPageListSchema](variables/NotionPageListSchema.md) | Result of querying a Notion database (paginated). |
| [NotionPageResponseSchema](variables/NotionPageResponseSchema.md) | Single page response (fields may be sparse depending on the endpoint). |
| [NotionPageSchema](variables/NotionPageSchema.md) | A Notion page object. |
| [NotionParentSchema](variables/NotionParentSchema.md) | Parent reference for pages and databases. |
| [NotionPropertySchemaSchema](variables/NotionPropertySchemaSchema.md) | Schema definition for a database property. |
| [NotionPropertyValueSchema](variables/NotionPropertyValueSchema.md) | Property value on a Notion page. |
| [NotionRichTextSchema](variables/NotionRichTextSchema.md) | Rich text object used in Notion blocks and properties. |
| [NotionSearchQuerySchema](variables/NotionSearchQuerySchema.md) | Search query options for the Notion API. |
| [NotionSearchResultSchema](variables/NotionSearchResultSchema.md) | Result of a Notion search (paginated). |
| [NotionSortSchema](variables/NotionSortSchema.md) | Sort option for querying a Notion database. |
| [NotionUserListSchema](variables/NotionUserListSchema.md) | Paginated list of Notion users. |
| [NotionUserResponseSchema](variables/NotionUserResponseSchema.md) | Single user response (fields may be sparse depending on the endpoint). |
| [NotionUserSchema](variables/NotionUserSchema.md) | A Notion user object. |
| [NumberFormatOptionsSchema](variables/NumberFormatOptionsSchema.md) | Options for plain number formatting. |
| [PrincipalSchema](variables/PrincipalSchema.md) | A principal is the *result of authenticating*: who the provider says you are, and how it proved it. |
| [ProductTypeSchema](variables/ProductTypeSchema.md) | Demo product shape (Express adapter). |
| [PROVIDER\_ENV\_NAMES](variables/PROVIDER_ENV_NAMES.md) | Provider slugs whose conventional environment variable name is known. Unknown providers fall back to `KATANAKIT_KEY_<PROVIDER>`, so the mapping is open-ended — a new provider never needs a code change here to work. |
| [ReadDirEntrySchema](variables/ReadDirEntrySchema.md) | A single directory entry with pre-resolved type flags. |
| [ReadDirOptionsSchema](variables/ReadDirOptionsSchema.md) | Options for directory listing. |
| [RssConfigSchema](variables/RssConfigSchema.md) | Configuration for generating an RSS feed. |
| [RssItemSchema](variables/RssItemSchema.md) | A single item in an RSS feed. |
| [SalePriceOptionsSchema](variables/SalePriceOptionsSchema.md) | Options for sale price arithmetic. |
| [ScrollPositionSchema](variables/ScrollPositionSchema.md) | Represents scroll position. |
| [SerializedErrorSchema](variables/SerializedErrorSchema.md) | Serialized error shape. |
| [siteConfig](variables/siteConfig.md) | Demo defaults — override in your project. |
| [SmartVideoOptionsSchema](variables/SmartVideoOptionsSchema.md) | Input for `useBuildVideoEmbed` (core) — one `src`, unified output. |
| [StorageTargetSchema](variables/StorageTargetSchema.md) | Storage backends (Web Storage API). |
| [ThemeModeSchema](variables/ThemeModeSchema.md) | Color scheme modes. |
| [useQuerySelector](variables/useQuerySelector.md) | Returns the first element matching a CSS selector. |
| [useQuerySelectorAll](variables/useQuerySelectorAll.md) | Returns all elements matching a CSS selector. |
| [ValidationIssueSchema](variables/ValidationIssueSchema.md) | Minimal issue shape (`error.issues` entries). |
| [VaultCipherSchema](variables/VaultCipherSchema.md) | AES-256-GCM envelope: IV and auth tag travel with the ciphertext. |
| [VaultDataSchema](variables/VaultDataSchema.md) | Decrypted vault payload — the complete state of the key manager. |
| [VaultKdfSchema](variables/VaultKdfSchema.md) | Scrypt parameters stored alongside the ciphertext so they stay upgradeable. |
| [ViewportSizeSchema](variables/ViewportSizeSchema.md) | Represents viewport dimensions. |
| [WordPressAuthSchema](variables/WordPressAuthSchema.md) | Authentication methods for WordPress. |
| [WordPressConfigSchema](variables/WordPressConfigSchema.md) | Configuration for the WordPress REST API integration. |
| [WpAcfFieldsSchema](variables/WpAcfFieldsSchema.md) | Container for ACF (Advanced Custom Fields) fields. |
| [WpBaseEntitySchema](variables/WpBaseEntitySchema.md) | Base fields shared by all WordPress entities. |
| [WpBatchOperationSchema](variables/WpBatchOperationSchema.md) | A single operation in a WordPress batch request. |
| [WpBatchResultSchema](variables/WpBatchResultSchema.md) | Result of a WordPress batch operation. |
| [WpCapabilityMapSchema](variables/WpCapabilityMapSchema.md) | WordPress capability map. |
| [WpCapabilitySchema](variables/WpCapabilitySchema.md) | A WordPress capability name: `edit_orders`, `read_private_orders`, `manage_options`. Snake_case, the vocabulary WordPress itself uses. |
| [WpCategoryCreateSchema](variables/WpCategoryCreateSchema.md) | Payload for creating a WordPress category. |
| [WpCategoryListSchema](variables/WpCategoryListSchema.md) | List of categories. |
| [WpCategoryResponseSchema](variables/WpCategoryResponseSchema.md) | Category response variant (partials via `_fields` stay well-typed). |
| [WpCategorySchema](variables/WpCategorySchema.md) | A WordPress category. |
| [WpCategoryUpdateSchema](variables/WpCategoryUpdateSchema.md) | Payload for updating a WordPress category. |
| [WpCommentCreateSchema](variables/WpCommentCreateSchema.md) | Payload for creating a WordPress comment. |
| [WpCommentListSchema](variables/WpCommentListSchema.md) | List of comments. |
| [WpCommentResponseSchema](variables/WpCommentResponseSchema.md) | Comment response variant (partials via `_fields` stay well-typed). |
| [WpCommentSchema](variables/WpCommentSchema.md) | A WordPress comment. |
| [WpCommentUpdateSchema](variables/WpCommentUpdateSchema.md) | Payload for updating a WordPress comment. |
| [WpEmbeddedSchema](variables/WpEmbeddedSchema.md) | Embedded resources returned when `_embed` is used. |
| [WpErrorSchema](variables/WpErrorSchema.md) | WordPress REST API error response. |
| [WpMediaListSchema](variables/WpMediaListSchema.md) | List of media items. |
| [WpMediaMetaSchema](variables/WpMediaMetaSchema.md) | Metadata for a media upload. |
| [WpMediaResponseSchema](variables/WpMediaResponseSchema.md) | Media response variant (partials via `_fields` stay well-typed). |
| [WpMediaSchema](variables/WpMediaSchema.md) | A WordPress media item (attachment). |
| [WpMediaUpdateSchema](variables/WpMediaUpdateSchema.md) | Payload for updating a WordPress media item. |
| [WpMenuItemSchema](variables/WpMenuItemSchema.md) | A WordPress menu item. |
| [WpMenuLocationSchema](variables/WpMenuLocationSchema.md) | A WordPress menu location. |
| [WpMenuSchema](variables/WpMenuSchema.md) | A WordPress menu. |
| [WpPageCreateSchema](variables/WpPageCreateSchema.md) | Payload for creating a WordPress page. |
| [WpPageListSchema](variables/WpPageListSchema.md) | List of pages. |
| [WpPageResponseSchema](variables/WpPageResponseSchema.md) | Page response variant (partials via `_fields` stay well-typed). |
| [WpPageSchema](variables/WpPageSchema.md) | A WordPress page. |
| [WpPageUpdateSchema](variables/WpPageUpdateSchema.md) | Payload for updating a WordPress page. |
| [WpPostCreateSchema](variables/WpPostCreateSchema.md) | Payload for creating a WordPress post. |
| [WpPostListSchema](variables/WpPostListSchema.md) | List of posts. |
| [WpPostResponseSchema](variables/WpPostResponseSchema.md) | Post response variant (partials via `_fields` stay well-typed). |
| [WpPostSchema](variables/WpPostSchema.md) | A WordPress post. |
| [WpPostUpdateSchema](variables/WpPostUpdateSchema.md) | Payload for updating a WordPress post. |
| [WpQueryParamsSchema](variables/WpQueryParamsSchema.md) | Common query parameters for WordPress REST API list endpoints. |
| [WpRoleAuditSchema](variables/WpRoleAuditSchema.md) | The result of auditing a declared role against what WordPress reports. |
| [WpRoleAuditStatusSchema](variables/WpRoleAuditStatusSchema.md) | How a declaration compares to the live site. |
| [WpRoleDefinitionSchema](variables/WpRoleDefinitionSchema.md) | A role declaration, the PHP-free replacement for `add_role()`. |
| [WpRoleRegistrySchema](variables/WpRoleRegistrySchema.md) | A declared role registry. |
| [WpSearchListSchema](variables/WpSearchListSchema.md) | List of search results. |
| [WpSearchResultSchema](variables/WpSearchResultSchema.md) | WordPress search result item. |
| [WpSettingsSchema](variables/WpSettingsSchema.md) | A WordPress settings object. |
| [WpTagCreateSchema](variables/WpTagCreateSchema.md) | Payload for creating a WordPress tag. |
| [WpTagListSchema](variables/WpTagListSchema.md) | List of tags. |
| [WpTagResponseSchema](variables/WpTagResponseSchema.md) | Tag response variant (partials via `_fields` stay well-typed). |
| [WpTagSchema](variables/WpTagSchema.md) | A WordPress tag. |
| [WpTagUpdateSchema](variables/WpTagUpdateSchema.md) | Payload for updating a WordPress tag. |
| [WpUserCreateSchema](variables/WpUserCreateSchema.md) | Payload for creating a WordPress user. |
| [WpUserListSchema](variables/WpUserListSchema.md) | List of users. |
| [WpUserResponseSchema](variables/WpUserResponseSchema.md) | User response variant (partials via `_fields` stay well-typed). |
| [WpUserSchema](variables/WpUserSchema.md) | A WordPress user. |
| [WpUserUpdateSchema](variables/WpUserUpdateSchema.md) | Payload for updating a WordPress user. |
| [WriteFileOptionsSchema](variables/WriteFileOptionsSchema.md) | Options for writing or appending files. |
| [YoutubeApiConfigSchema](variables/YoutubeApiConfigSchema.md) | Config for the YouTube service. One GCP project serves all repos. |
| [YoutubeChannelsResponseSchema](variables/YoutubeChannelsResponseSchema.md) | Minimal `channels.list` shape (only what the service reads). |
| [YoutubeEmbedOptionsSchema](variables/YoutubeEmbedOptionsSchema.md) | Options for the YouTube nocookie embed URL. |
| [YoutubeListParamsSchema](variables/YoutubeListParamsSchema.md) | Params for `useGetChannelVideos`. |
| [YoutubePlaylistItemsResponseSchema](variables/YoutubePlaylistItemsResponseSchema.md) | Minimal `playlistItems.list` shape (only what the service reads). |
| [YoutubeThumbnailQualitySchema](variables/YoutubeThumbnailQualitySchema.md) | Thumbnail quality for `i.ytimg.com`. |
| [YoutubeVideoNormalizedSchema](variables/YoutubeVideoNormalizedSchema.md) | Normalized video, enriched with player-ready URLs. |
| [YoutubeVideoPageSchema](variables/YoutubeVideoPageSchema.md) | Paginated channel listing result. |
| [YoutubeVideosResponseSchema](variables/YoutubeVideosResponseSchema.md) | Minimal `videos.list` shape (only what the service reads). |
| [YoutubeVideoThumbnailsSchema](variables/YoutubeVideoThumbnailsSchema.md) | Resolution-keyed thumbnails (all derivable without an API key). |

## Functions

| Function | Description |
| ------ | ------ |
| [CacheDecorator](functions/CacheDecorator.md) | Decorates an async function with memoized results (Decorator Pattern). |
| [createMemoryStorage](functions/createMemoryStorage.md) | Creates a new in-memory `Storage` instance used as an SSR / private-mode fallback. Each call owns its own Map — never share one across requests. |
| [defineApiConfig](functions/defineApiConfig.md) | Declares the API registry in a single call - the config-file entry point. |
| [defineSeoMetaConfig](functions/defineSeoMetaConfig.md) | Registers the site-wide SEO config once — the same `define*Config` pattern used by the HTTP client and the other services. |
| [LocalStorageStrategy](functions/LocalStorageStrategy.md) | Creates a strategy backed by `window.localStorage`. |
| [LoggerDecorator](functions/LoggerDecorator.md) | LoggerDecorator - Decorator Pattern para trazado de llamadas. |
| [MemoryStorageStrategy](functions/MemoryStorageStrategy.md) | Creates a strategy backed by an in-memory store (SSR / private-mode fallback). |
| [RetryDecorator](functions/RetryDecorator.md) | RetryDecorator - Decorator Pattern para reintentos. |
| [SessionStorageStrategy](functions/SessionStorageStrategy.md) | Creates a strategy backed by `window.sessionStorage`. |
| [useAddClass](functions/useAddClass.md) | Adds one or more CSS classes to the target element. |
| [useAddDays](functions/useAddDays.md) | Adds a number of days to a date. |
| [useAddKey](functions/useAddKey.md) | Appends a record to the vault payload. See [KeyVaultService.useAddKey](classes/KeyVaultService.md#useaddkey). |
| [useAddMcpServer](functions/useAddMcpServer.md) | Adds or replaces a server in the registry. See [McpService.useAddMcpServer](classes/McpService.md#useaddmcpserver). |
| [useAddRequestInterceptor](functions/useAddRequestInterceptor.md) | Registers a request interceptor on the singleton HTTP client. |
| [useAgentDefinitions](functions/useAgentDefinitions.md) | Lists the supported agents. See [AgentConfigService.useAgentDefinitions](classes/AgentConfigService.md#useagentdefinitions). |
| [useAppend](functions/useAppend.md) | Appends a child element to the target parent. |
| [useAppendFile](functions/useAppendFile.md) | Appends text or bytes to a file, creating it when missing. |
| [useApplySeoTag](functions/useApplySeoTag.md) | Applies tags from a [SeoTagResult](type-aliases/SeoTagResult.md) into `document.head` (Vanilla / SPA). No-op when `document` is unavailable (SSR). |
| [useAttempt](functions/useAttempt.md) | Runs an operation and captures any throw as a Safe Result. See [ResultService.useAttempt](classes/ResultService.md#useattempt). |
| [useAverage](functions/useAverage.md) | Computes the arithmetic mean of an array of numbers. |
| [useBearerToken](functions/useBearerToken.md) | Reads the bearer token from anything carrying headers. |
| [useBlurActiveElement](functions/useBlurActiveElement.md) | Removes focus from the currently active element. |
| [useBuildUrl](functions/useBuildUrl.md) | Returns the URL of a registered endpoint **without calling `fetch`**. |
| [useBuildVideoEmbed](functions/useBuildVideoEmbed.md) | Builds the embed HTML for any supported source. |
| [useBuildVimeoEmbedUrl](functions/useBuildVimeoEmbedUrl.md) | Builds the Vimeo player embed URL. |
| [useBuildYoutubeEmbedUrl](functions/useBuildYoutubeEmbedUrl.md) | Builds the privacy-enhanced YouTube embed URL. |
| [useBuildYoutubeRssUrl](functions/useBuildYoutubeRssUrl.md) | Builds the public channel RSS feed URL. |
| [useBuildYoutubeThumbnail](functions/useBuildYoutubeThumbnail.md) | Builds the public YouTube thumbnail URL. |
| [useCan](functions/useCan.md) | Whether the subject may perform a capability. Any of the subject's roles granting the capability (directly or by inheritance) is enough. |
| [useCapabilitiesFor](functions/useCapabilitiesFor.md) | Effective capabilities of a role: its own plus every less-privileged role's. |
| [useCapitalize](functions/useCapitalize.md) | Capitalizes the first character. See [FormatterService.useCapitalize](classes/FormatterService.md#usecapitalize). |
| [useChat](functions/useChat.md) | Sends a single chat completion and returns the assistant text as a Safe Result. |
| [useChunk](functions/useChunk.md) | Splits an array into chunks of the given size. |
| [useClearStorage](functions/useClearStorage.md) | Clears all values from the specified storage backend. |
| [useConvertCurrency](functions/useConvertCurrency.md) | Converts an amount between two currencies against ECB reference rates. |
| [useCopyFile](functions/useCopyFile.md) | Copies a file. Existing destinations are overwritten unless `overwrite: false` is passed (`COPYFILE_EXCL`). |
| [useCopyToClipboard](functions/useCopyToClipboard.md) | Copies text to the clipboard (browser only). |
| [useCreateBatch](functions/useCreateBatch.md) | Creates a batch function. See [ReactiveService.useCreateBatch](classes/ReactiveService.md#usecreatebatch). |
| [useCreateDebouncedSignal](functions/useCreateDebouncedSignal.md) | Creates a signal with a debounced setter. See [ReactiveService.useCreateDebouncedSignal](classes/ReactiveService.md#usecreatedebouncedsignal). |
| [useCreateEffect](functions/useCreateEffect.md) | Creates a tracked side effect. See [ReactiveService.useCreateEffect](classes/ReactiveService.md#usecreateeffect). |
| [useCreateElement](functions/useCreateElement.md) | Creates a new HTML element. |
| [useCreateKeyRecord](functions/useCreateKeyRecord.md) | Creates a validated key record. See [KeyVaultService.useCreateKeyRecord](classes/KeyVaultService.md#usecreatekeyrecord). |
| [useCreateMcpServer](functions/useCreateMcpServer.md) | Creates a validated MCP server entry. See [McpService.useCreateMcpServer](classes/McpService.md#usecreatemcpserver). |
| [useCreateMemo](functions/useCreateMemo.md) | Creates a memoised signal. See [ReactiveService.useCreateMemo](classes/ReactiveService.md#usecreatememo). |
| [useCreateMemoryStore](functions/useCreateMemoryStore.md) | Creates a fresh in-memory conversation store. Useful in tests or when you want an isolated store per process. |
| [useCreatePool](functions/useCreatePool.md) | Creates a reusable Worker pool under a unique key. If a pool with the same key already exists, it is terminated first. |
| [useCreateQueryClient](functions/useCreateQueryClient.md) | Creates a **new** QueryClient. Use this on the server (SSR) to get one client per request and avoid sharing a process-global cache across users. |
| [useCreateSession](functions/useCreateSession.md) | Creates a new conversation session. |
| [useCreateSignal](functions/useCreateSignal.md) | Creates a reactive signal. See [ReactiveService.useCreateSignal](classes/ReactiveService.md#usecreatesignal). |
| [useCreateStorageSignal](functions/useCreateStorageSignal.md) | Creates a signal that persists its value to a storage backend (localStorage, sessionStorage, etc.). Reads the initial value from storage on creation. |
| [useCreateToggle](functions/useCreateToggle.md) | Creates a boolean toggle signal. See [ReactiveService.useCreateToggle](classes/ReactiveService.md#usecreatetoggle). |
| [useCurrencyConverter](functions/useCurrencyConverter.md) | Wires the shared [CurrencyConverterService](classes/CurrencyConverterService.md) with the default rate source (Frankfurter) and returns it. |
| [useDateAdd](functions/useDateAdd.md) | Returns the date a given number of units away, with calendar semantics. |
| [useDateBetween](functions/useDateBetween.md) | Returns the whole number of `unit`s between two dates. Signed, never fractional, and defaulting to `days`. |
| [useDateOrder](functions/useDateOrder.md) | Returns whether the first date comes before, after, or at the same time as the second. |
| [useDateSubtract](functions/useDateSubtract.md) | Subtracts units from a date, with calendar semantics. |
| [useDebounce](functions/useDebounce.md) | Trailing-edge debounce. See [TimingService.useDebounce](classes/TimingService.md#usedebounce). |
| [useDebounceImmediate](functions/useDebounceImmediate.md) | Leading-edge debounce. See [TimingService.useDebounceImmediate](classes/TimingService.md#usedebounceimmediate). |
| [useDecryptVault](functions/useDecryptVault.md) | Opens an encrypted envelope. See [VaultStore.useDecryptVault](classes/VaultStore.md#usedecryptvault). |
| [useDeepClone](functions/useDeepClone.md) | Deep clones a value using `structuredClone` with a JSON fallback. |
| [useDeepMerge](functions/useDeepMerge.md) | Deep merges `source` into a shallow copy of `target`. |
| [useDelete](functions/useDelete.md) | DELETE helper over a registered API endpoint. |
| [useDestroyTheme](functions/useDestroyTheme.md) | Cleans up the media-query listener. Call this when the theme system is no longer needed (e.g. during teardown in tests). |
| [useDurationBetween](functions/useDurationBetween.md) | Returns the balanced breakdown between two dates as a `Temporal.Duration`. |
| [useEmitAgentConfig](functions/useEmitAgentConfig.md) | Emits agent configuration. See [AgentConfigService.useEmitAgentConfig](classes/AgentConfigService.md#useemitagentconfig). |
| [useEmitOpenCodeServers](functions/useEmitOpenCodeServers.md) | Renders entries as a `mcp.servers` JSON fragment. See [McpService.useEmitOpenCodeServers](classes/McpService.md#useemitopencodeservers). |
| [useEmptyVault](functions/useEmptyVault.md) | Returns an empty vault payload. See [KeyVaultService.useEmptyVault](classes/KeyVaultService.md#useemptyvault). |
| [useEncryptVault](functions/useEncryptVault.md) | Encrypts a vault payload. See [VaultStore.useEncryptVault](classes/VaultStore.md#useencryptvault). |
| [useEnhanceVideoFacades](functions/useEnhanceVideoFacades.md) | Hydrates click-to-play facades rendered by `useBuildVideoEmbed`. SSR-safe: no-op outside the browser, no side effects on import. Call once per page (Astro/React/Vue/MDX `useEffect` or inline script). |
| [useEnsureDir](functions/useEnsureDir.md) | Creates a directory (and any missing parents). |
| [useErrorCustom](functions/useErrorCustom.md) | Creates a custom error object. See [ErrorService.useErrorCustom](classes/ErrorService.md#useerrorcustom). |
| [useErrorNormalize](functions/useErrorNormalize.md) | Normalizes any thrown value into an [ApiError](type-aliases/ApiError.md). See [ErrorService.useErrorNormalize](classes/ErrorService.md#useerrornormalize). |
| [useErrorSerialize](functions/useErrorSerialize.md) | Serializes an error into a plain object. See [ErrorService.useErrorSerialize](classes/ErrorService.md#useerrorserialize). |
| [useEvery](functions/useEvery.md) | Whether every item matches. See [ArrayService.useEvery](classes/ArrayService.md#useevery). |
| [useEveryAsync](functions/useEveryAsync.md) | Async every, short-circuiting. See [ArrayService.useEveryAsync](classes/ArrayService.md#useeveryasync). |
| [useExitFullscreen](functions/useExitFullscreen.md) | Exits fullscreen mode. |
| [useFakeBoolean](functions/useFakeBoolean.md) | Generates a random boolean. See [FakerService.useFakeBoolean](classes/FakerService.md#usefakeboolean). |
| [useFakeCompanyName](functions/useFakeCompanyName.md) | Generates a fake company name. See [FakerService.useFakeCompanyName](classes/FakerService.md#usefakecompanyname). |
| [useFakeDate](functions/useFakeDate.md) | Generates a random date within an optional range. See [FakerService.useFakeDate](classes/FakerService.md#usefakedate). |
| [useFakeEmail](functions/useFakeEmail.md) | Generates a fake email address. See [FakerService.useFakeEmail](classes/FakerService.md#usefakeemail). |
| [useFakeFirstName](functions/useFakeFirstName.md) | Generates a fake first name. See [FakerService.useFakeFirstName](classes/FakerService.md#usefakefirstname). |
| [useFakeFullName](functions/useFakeFullName.md) | Generates a fake full name. See [FakerService.useFakeFullName](classes/FakerService.md#usefakefullname). |
| [useFakeLastName](functions/useFakeLastName.md) | Generates a fake last name. See [FakerService.useFakeLastName](classes/FakerService.md#usefakelastname). |
| [useFakeList](functions/useFakeList.md) | Builds an array of fake items from a factory. See [FakerService.useFakeList](classes/FakerService.md#usefakelist). |
| [useFakeNumber](functions/useFakeNumber.md) | Generates an integer within an inclusive range. See [FakerService.useFakeNumber](classes/FakerService.md#usefakenumber). |
| [useFakePhone](functions/useFakePhone.md) | Generates a fake phone number. See [FakerService.useFakePhone](classes/FakerService.md#usefakephone). |
| [useFakeSeed](functions/useFakeSeed.md) | Seeds faker for reproducible output. See [FakerService.useFakeSeed](classes/FakerService.md#usefakeseed). |
| [useFakeSetDefaultRefDate](functions/useFakeSetDefaultRefDate.md) | Pins faker's reference date. See [FakerService.useFakeSetDefaultRefDate](classes/FakerService.md#usefakesetdefaultrefdate). |
| [useFakeText](functions/useFakeText.md) | Generates lorem-ipsum text. See [FakerService.useFakeText](classes/FakerService.md#usefaketext). |
| [useFakeUrl](functions/useFakeUrl.md) | Generates a fake URL. See [FakerService.useFakeUrl](classes/FakerService.md#usefakeurl). |
| [useFakeUuid](functions/useFakeUuid.md) | Generates a v4 UUID. See [FakerService.useFakeUuid](classes/FakerService.md#usefakeuuid). |
| [useFakeVehicle](functions/useFakeVehicle.md) | Generates a generic fake vehicle. See [FakerService.useFakeVehicle](classes/FakerService.md#usefakevehicle). |
| [useFetch](functions/useFetch.md) | Fetches a registered endpoint and returns a Safe Result. |
| [useFetchApi](functions/useFetchApi.md) | Fetches a registered endpoint and returns a Safe Result. Alias for [useFetch](functions/useFetch.md). |
| [useFileExists](functions/useFileExists.md) | Checks whether a path exists and is accessible. Never throws: returns `false` for missing paths and non-Node runtimes. |
| [useFilter](functions/useFilter.md) | Keeps the items that satisfy `predicate`. See [ArrayService.useFilter](classes/ArrayService.md#usefilter). |
| [useFilterAsync](functions/useFilterAsync.md) | Async filter, in parallel. See [ArrayService.useFilterAsync](classes/ArrayService.md#usefilterasync). |
| [useFind](functions/useFind.md) | Returns the first matching item, or `undefined`. See [ArrayService.useFind](classes/ArrayService.md#usefind). |
| [useFindAgent](functions/useFindAgent.md) | Finds an agent definition by id. See [AgentConfigService.useFindAgent](classes/AgentConfigService.md#usefindagent). |
| [useFindAsync](functions/useFindAsync.md) | Async find, short-circuiting. See [ArrayService.useFindAsync](classes/ArrayService.md#usefindasync). |
| [useFindIndex](functions/useFindIndex.md) | Returns the index of the first match, or `-1`. See [ArrayService.useFindIndex](classes/ArrayService.md#usefindindex). |
| [useFindKey](functions/useFindKey.md) | Finds a key record by id. See [KeyVaultService.useFindKey](classes/KeyVaultService.md#usefindkey). |
| [useFindLast](functions/useFindLast.md) | Returns the last matching item, or `undefined`. See [ArrayService.useFindLast](classes/ArrayService.md#usefindlast). |
| [useFindMcpServer](functions/useFindMcpServer.md) | Finds a server by name. See [McpService.useFindMcpServer](classes/McpService.md#usefindmcpserver). |
| [useFirstDayOfMonth](functions/useFirstDayOfMonth.md) | Returns the first day of the month for a given date. |
| [useFlatMap](functions/useFlatMap.md) | Maps to collections and flattens one level. See [ArrayService.useFlatMap](classes/ArrayService.md#useflatmap). |
| [useFocusElement](functions/useFocusElement.md) | Focuses an element. |
| [useFormat](functions/useFormat.md) | Formats a date input into a localised string using `Intl.DateTimeFormat`. |
| [useFormatCurrency](functions/useFormatCurrency.md) | Formats an amount as currency. See [FormatterService.useFormatCurrency](classes/FormatterService.md#useformatcurrency). |
| [useFormatNumber](functions/useFormatNumber.md) | Formats a number. See [FormatterService.useFormatNumber](classes/FormatterService.md#useformatnumber). |
| [useFromEntries](functions/useFromEntries.md) | Typed `Object.fromEntries`. See [ArrayService.useFromEntries](classes/ArrayService.md#usefromentries). |
| [useGenerateMetaTags](functions/useGenerateMetaTags.md) | HTML string of meta tags (no RSS). Prefer [useSeoMeta](functions/useSeoMeta.md). |
| [useGet](functions/useGet.md) | GET helper over a registered API endpoint. |
| [useGetActiveElement](functions/useGetActiveElement.md) | Returns the currently focused element. |
| [useGetApi](functions/useGetApi.md) | GET helper over a registered API endpoint. Alias for [useGet](functions/useGet.md). |
| [useGetApis](functions/useGetApis.md) | Returns a shallow copy of the registered APIs (safe to mutate locally). |
| [useGetApisConfig](functions/useGetApisConfig.md) | Returns a shallow copy of the registered APIs. Alias for [useGetApis](functions/useGetApis.md). |
| [useGetAttribute](functions/useGetAttribute.md) | Gets the value of an attribute from the target element. |
| [useGetBackCamera](functions/useGetBackCamera.md) | Opens the back-facing (environment) camera. |
| [useGetBasename](functions/useGetBasename.md) | Returns the last portion of a path (file name). |
| [useGetBattery](functions/useGetBattery.md) | Gets the device battery status. |
| [useGetBody](functions/useGetBody.md) | Returns the `<body>` element, or `null` outside a browser. |
| [useGetChannelVideos](functions/useGetChannelVideos.md) | Lists channel videos via the quota-cheap path. |
| [useGetChannelVideosRss](functions/useGetChannelVideosRss.md) | Fetches and parses the keyless channel RSS feed. |
| [useGetCwd](functions/useGetCwd.md) | Returns the current working directory of the process (where the command was launched), or `null` outside a Node-compatible runtime. Use it for project-relative paths; use [useGetDirname](functions/useGetDirname.md) for file-relative paths. |
| [useGetDataAttribute](functions/useGetDataAttribute.md) | Gets a `data-*` attribute value from the target element. |
| [useGetDirname](functions/useGetDirname.md) | Resolves the directory of a module from its `import.meta.url`. |
| [useGetElementByClass](functions/useGetElementByClass.md) | Finds the first element matching a class name. |
| [useGetElementById](functions/useGetElementById.md) | Finds an element by its `id` attribute. |
| [useGetExchangeRate](functions/useGetExchangeRate.md) | Returns the exchange rate between two currencies. |
| [useGetFileExtension](functions/useGetFileExtension.md) | Returns the extension of a path, including the leading dot. |
| [useGetFileStats](functions/useGetFileStats.md) | Returns a portable stats subset for a file or directory. |
| [useGetFrontCamera](functions/useGetFrontCamera.md) | Opens the front-facing (user) camera. |
| [useGetGeolocation](functions/useGetGeolocation.md) | Gets the device's current geographic position once. |
| [useGetHistory](functions/useGetHistory.md) | Returns the full message history of a session, oldest first. |
| [useGetMediaStream](functions/useGetMediaStream.md) | Requests a media stream (camera, microphone, or both). |
| [useGetRelativePath](functions/useGetRelativePath.md) | Computes the relative path from `from` to `to`. |
| [useGetResolved](functions/useGetResolved.md) | Returns the resolved theme (`"light"` or `"dark"`), accounting for system preference when mode is `"system"`. |
| [useGetRoot](functions/useGetRoot.md) | Returns the root `<html>` element, or `null` outside a browser. |
| [useGetScrollPosition](functions/useGetScrollPosition.md) | Returns the current scroll position as `{ x, y }`. |
| [useGetScrollProgress](functions/useGetScrollProgress.md) | Returns the vertical scroll progress as a value between `0` (top) and `1` (bottom). |
| [useGetScrollX](functions/useGetScrollX.md) | Returns the current horizontal scroll position. |
| [useGetScrollY](functions/useGetScrollY.md) | Returns the current vertical scroll position. |
| [useGetStorage](functions/useGetStorage.md) | Retrieves a value from storage by key. |
| [useGetThemeMode](functions/useGetThemeMode.md) | Returns the current theme mode (may be `"system"`). |
| [useGetTitle](functions/useGetTitle.md) | Returns the current document title. |
| [useGetUploadsPlaylistId](functions/useGetUploadsPlaylistId.md) | Resolves a channel id to its uploads playlist id. |
| [useGetUrlParams](functions/useGetUrlParams.md) | Parses query parameters from a URL string into a plain object. |
| [useGetVideoDetails](functions/useGetVideoDetails.md) | Enriches videos with duration and view count. |
| [useGetViewportSize](functions/useGetViewportSize.md) | Returns the current viewport dimensions. |
| [useGetVimeoVideoId](functions/useGetVimeoVideoId.md) | Extracts a Vimeo video id from a URL or bare id. |
| [useGetYoutubeConfig](functions/useGetYoutubeConfig.md) | Returns a shallow copy of the YouTube config. |
| [useGetYoutubeVideoId](functions/useGetYoutubeVideoId.md) | Extracts a YouTube video id from a URL or bare id. |
| [useGrantAwareCan](functions/useGrantAwareCan.md) | Resolves a capability against a subject **and** a resource. |
| [useGroupBy](functions/useGroupBy.md) | Groups array items by a key property or key selector function. |
| [useHasClass](functions/useHasClass.md) | Checks whether the target element has a given CSS class. |
| [useHash](functions/useHash.md) | Derives a PBKDF2-SHA512 hash of `plainText`. See [GeneratorService.useHash](classes/GeneratorService.md#usehash). |
| [useHashFile](functions/useHashFile.md) | Streams a file and returns its checksum as a lowercase hex digest. |
| [useHasRole](functions/useHasRole.md) | Exact role membership - no hierarchy involved. |
| [useHasWorker](functions/useHasWorker.md) | Checks whether a Worker pool with the given key exists. |
| [useHeadTags](functions/useHeadTags.md) | Full `<head>` HTML (meta + RSS) from a flat [SeoMetaInput](type-aliases/SeoMetaInput.md). |
| [useInitAgent](functions/useInitAgent.md) | Registers the AI provider for the Kitt assistant. |
| [useInitAssistant](functions/useInitAssistant.md) | Configures the assistant: provider (Kitt) plus an optional conversation store. |
| [useInitQueryClient](functions/useInitQueryClient.md) | Replaces the shared QueryClient singleton with a configured instance. The previous client's caches are cleared before swapping. |
| [useInitTheme](functions/useInitTheme.md) | Initializes the theme system. Reads the stored preference (or falls back to `defaultMode`), applies the theme, and registers a system color-scheme listener for `"system"` mode. |
| [useInitYoutube](functions/useInitYoutube.md) | Registers the YouTube APIs and stores the default channel. |
| [useInterval](functions/useInterval.md) | Interval with pause/resume/stop controls. See [TimingService.useInterval](classes/TimingService.md#useinterval). |
| [useIsAfter](functions/useIsAfter.md) | Checks whether `date1` is after `date2`. |
| [useIsAtBottom](functions/useIsAtBottom.md) | Checks whether the page is scrolled to (or near) the bottom. |
| [useIsAtTop](functions/useIsAtTop.md) | Checks whether the page is scrolled to (or near) the top. |
| [useIsBefore](functions/useIsBefore.md) | Checks whether `date1` is before `date2`. |
| [useIsBrowser](functions/useIsBrowser.md) | Checks whether the code is running in a browser environment. |
| [useIsDocumentVisible](functions/useIsDocumentVisible.md) | Checks whether the document tab is currently visible. |
| [useIsEqual](functions/useIsEqual.md) | Checks whether two dates are equal. |
| [useIsFullscreen](functions/useIsFullscreen.md) | Checks whether the document is currently in fullscreen mode. |
| [useIsNode](functions/useIsNode.md) | Checks whether the code runs in a Node.js-compatible runtime (Node, Bun or Deno). Returns `false` in browsers and edge runtimes. |
| [useIsObject](functions/useIsObject.md) | Type guard that checks whether a value is a plain object (not null, not an array). |
| [useIsSupported](functions/useIsSupported.md) | Checks whether `IntersectionObserver` is available in the current environment. |
| [useJoinPath](functions/useJoinPath.md) | Joins path segments without resolving against `process.cwd()`. |
| [useJsonParse](functions/useJsonParse.md) | Parses JSON. See [FormatterService.useJsonParse](classes/FormatterService.md#usejsonparse). |
| [useJsonStringify](functions/useJsonStringify.md) | Pretty-prints JSON. See [FormatterService.useJsonStringify](classes/FormatterService.md#usejsonstringify). |
| [useKeys](functions/useKeys.md) | Typed `Object.keys`. See [ArrayService.useKeys](classes/ArrayService.md#usekeys). |
| [useLastDayOfMonth](functions/useLastDayOfMonth.md) | Returns the last day of the month for a given date. |
| [useLazyLoaderHas](functions/useLazyLoaderHas.md) | Checks whether a lazy-loader with the given key is active. |
| [useLazyLoaderInit](functions/useLazyLoaderInit.md) | Initializes lazy loading for images using IntersectionObserver. Elements matching the selector must have a `data-src` attribute with the real image URL. |
| [useLazyLoaderStop](functions/useLazyLoaderStop.md) | Stops a lazy-loader instance and disconnects its underlying observer. |
| [useLazyLoaderStopAll](functions/useLazyLoaderStopAll.md) | Stops all active lazy-loader instances. |
| [useListKeys](functions/useListKeys.md) | Lists key records, newest first. See [KeyVaultService.useListKeys](classes/KeyVaultService.md#uselistkeys). |
| [useListMcpServers](functions/useListMcpServers.md) | Lists registered servers. See [McpService.useListMcpServers](classes/McpService.md#uselistmcpservers). |
| [useLoadVaultFile](functions/useLoadVaultFile.md) | Reads and opens a vault file. See [VaultStore.useLoadVaultFile](classes/VaultStore.md#useloadvaultfile). |
| [useLogger](functions/useLogger.md) | Wrapper para LoggerService - mantiene backward compatibility |
| [useLoggerClear](functions/useLoggerClear.md) | Wrapper para LoggerService - mantiene backward compatibility |
| [useLoggerError](functions/useLoggerError.md) | Wrapper para LoggerService - mantiene backward compatibility |
| [useLoggerTable](functions/useLoggerTable.md) | Wrapper para LoggerService - mantiene backward compatibility |
| [useLoggerWarn](functions/useLoggerWarn.md) | Wrapper para LoggerService - mantiene backward compatibility |
| [useLowerCase](functions/useLowerCase.md) | Locale-aware lower case. See [FormatterService.useLowerCase](classes/FormatterService.md#uselowercase). |
| [useMap](functions/useMap.md) | Projects every item. See [ArrayService.useMap](classes/ArrayService.md#usemap). |
| [useMapAsync](functions/useMapAsync.md) | Async map, in parallel. See [ArrayService.useMapAsync](classes/ArrayService.md#usemapasync). |
| [useMaskSecret](functions/useMaskSecret.md) | Masks a secret for display. See [KeyVaultService.useMaskSecret](classes/KeyVaultService.md#usemasksecret). |
| [useMatchesMedia](functions/useMatchesMedia.md) | Tests a CSS media query against the current viewport. |
| [useModalClose](functions/useModalClose.md) | Closes a modal by adding the "hidden" class or removing it from the DOM. Clicking outside the modal or calling this function will hide it. |
| [useMoveFile](functions/useMoveFile.md) | Moves (renames) a file or directory. |
| [useNow](functions/useNow.md) | Returns today's date as an ISO date string. |
| [useNowDateTime](functions/useNowDateTime.md) | Returns the current date and time as an ISO string (no timezone offset). |
| [useNumericId](functions/useNumericId.md) | Returns the next auto-incrementing numeric id. See [GeneratorService.useNumericId](classes/GeneratorService.md#usenumericid). |
| [useObserverCreate](functions/useObserverCreate.md) | Creates an IntersectionObserver under the given key. If an observer with the same key already exists, it is disconnected first. |
| [useObserverDisconnect](functions/useObserverDisconnect.md) | Disconnects and removes an observer by key, cleaning up all observed targets. |
| [useObserverDisconnectAll](functions/useObserverDisconnectAll.md) | Disconnects and removes all registered observers. |
| [useObserverHas](functions/useObserverHas.md) | Checks whether an observer with the given key exists. |
| [useObserverKeys](functions/useObserverKeys.md) | Returns a list of all registered observer keys. |
| [useObserverObserve](functions/useObserverObserve.md) | Starts observing a single element under an existing observer key. |
| [useObserverObserveAll](functions/useObserverObserveAll.md) | Observes all elements matching a CSS selector under an existing observer key. |
| [useObserverUnobserve](functions/useObserverUnobserve.md) | Stops observing a specific element under an observer key. |
| [useOmit](functions/useOmit.md) | Omits the listed keys from an object, returning a shallow copy without them. |
| [useOn](functions/useOn.md) | Attaches an event listener to the target element and returns a cleanup function. |
| [useOnDeviceMotion](functions/useOnDeviceMotion.md) | Listens for device motion events (acceleration, rotation rate). |
| [useOnDeviceOrientation](functions/useOnDeviceOrientation.md) | Listens for device orientation events (compass heading, tilt). |
| [useOnVisibilityChange](functions/useOnVisibilityChange.md) | Registers a callback for document visibility changes. |
| [useOpenCodeServersObject](functions/useOpenCodeServersObject.md) | Projects entries into an OpenCode `mcp.servers` object. See [McpService.useOpenCodeServersObject](classes/McpService.md#useopencodeserversobject). |
| [useParseIso8601Duration](functions/useParseIso8601Duration.md) | Parses an ISO 8601 duration into seconds. |
| [useParseMediaSource](functions/useParseMediaSource.md) | Normalizes any supported input into a `MediaSource`. |
| [useParseSmartVideoOptions](functions/useParseSmartVideoOptions.md) | Validates input against the `SmartVideoOptions` schema. |
| [useParseYoutubeRss](functions/useParseYoutubeRss.md) | Parses a YouTube channel RSS feed into normalized videos. |
| [usePartition](functions/usePartition.md) | Splits into `[matching, rest]`. See [ArrayService.usePartition](classes/ArrayService.md#usepartition). |
| [usePatch](functions/usePatch.md) | PATCH helper over a registered API endpoint. |
| [usePbkdf2Hash](functions/usePbkdf2Hash.md) | Alias for [GeneratorService.useHash](classes/GeneratorService.md#usehash). See [GeneratorService.usePbkdf2Hash](classes/GeneratorService.md#usepbkdf2hash). |
| [usePick](functions/usePick.md) | Picks the listed keys from an object into a new object. |
| [usePost](functions/usePost.md) | POST helper over a registered API endpoint. |
| [usePrefersColorScheme](functions/usePrefersColorScheme.md) | Checks whether the user's OS is set to prefer a dark color scheme. |
| [usePrefersDarkMode](functions/usePrefersDarkMode.md) | Checks whether the user's OS prefers dark mode. |
| [usePrefersReducedMotion](functions/usePrefersReducedMotion.md) | Checks whether the user prefers reduced motion. |
| [usePrintPage](functions/usePrintPage.md) | Triggers the browser print dialog. |
| [useProviderEnvName](functions/useProviderEnvName.md) | Resolves the env var name for a provider. See [KeyVaultService.useProviderEnvName](classes/KeyVaultService.md#useproviderenvname). |
| [usePut](functions/usePut.md) | PUT helper over a registered API endpoint. |
| [useQueryClient](functions/useQueryClient.md) | Returns the shared QueryClient singleton, creating one on first call. |
| [useRace](functions/useRace.md) | Races a promise against a timeout. See [TimingService.useRace](classes/TimingService.md#userace). |
| [useReadDir](functions/useReadDir.md) | Lists a directory with type flags resolved per entry. |
| [useReadFile](functions/useReadFile.md) | Reads a text file. |
| [useReadFileBuffer](functions/useReadFileBuffer.md) | Reads a file as raw bytes (no encoding). |
| [useReadJsonFile](functions/useReadJsonFile.md) | Reads and parses a JSON file, optionally validating it with a Zod schema. |
| [useReadModuleFile](functions/useReadModuleFile.md) | Reads a file resolved from the caller's module directory — the `__dirname` + relative path pattern, without `__dirname`. |
| [useReadModuleJson](functions/useReadModuleJson.md) | Reads and parses a JSON file resolved from the caller's module directory, optionally validating it with a Zod schema. |
| [useReduce](functions/useReduce.md) | Folds into a single value. See [ArrayService.useReduce](classes/ArrayService.md#usereduce). |
| [useReduceAsync](functions/useReduceAsync.md) | Async reduce, sequential. See [ArrayService.useReduceAsync](classes/ArrayService.md#usereduceasync). |
| [useRefreshExchangeRates](functions/useRefreshExchangeRates.md) | Forces a rate refresh, bypassing the cache. Subscribers get `onRatesUpdate`. |
| [useRegisterRole](functions/useRegisterRole.md) | Registers (or replaces) a role definition. Use it to extend a built-in role's capabilities, e.g. grant `content:create` to `member`. |
| [useRemove](functions/useRemove.md) | Removes the target element from the DOM. |
| [useRemoveAttribute](functions/useRemoveAttribute.md) | Removes an attribute from the target element. |
| [useRemoveClass](functions/useRemoveClass.md) | Removes CSS class(es) from the target element. |
| [useRemoveDir](functions/useRemoveDir.md) | Removes a directory tree. Recursive by default; `force: false` surfaces `ENOENT` instead of ignoring missing paths. |
| [useRemoveFile](functions/useRemoveFile.md) | Removes a file. |
| [useRemoveMcpServer](functions/useRemoveMcpServer.md) | Removes a server from the registry. See [McpService.useRemoveMcpServer](classes/McpService.md#useremovemcpserver). |
| [useRemoveStorage](functions/useRemoveStorage.md) | Removes a value from storage by key. |
| [useRepeat](functions/useRepeat.md) | Repeats a callback with an optional delay. See [TimingService.useRepeat](classes/TimingService.md#userepeat). |
| [useReplaceKey](functions/useReplaceKey.md) | Replaces a record in the vault payload. See [KeyVaultService.useReplaceKey](classes/KeyVaultService.md#usereplacekey). |
| [useReply](functions/useReply.md) | Sends a user message within a conversation and returns the assistant reply. If no `sessionId` is provided, a new session is created. The user message and the assistant reply are persisted only on success. |
| [useRequestFullscreen](functions/useRequestFullscreen.md) | Requests fullscreen on the given element (or the document root). |
| [useRequestMotionPermission](functions/useRequestMotionPermission.md) | Requests permission to access device orientation/motion sensors (required on iOS 13+). |
| [useResetRoles](functions/useResetRoles.md) | Restores the built-in role registry (mainly for tests). |
| [useResetSeoMetaConfig](functions/useResetSeoMetaConfig.md) | Clears the registered config (restores the demo defaults). Useful in tests. |
| [useResetSession](functions/useResetSession.md) | Deletes a conversation session and its messages. |
| [useResetTheme](functions/useResetTheme.md) | Resets the theme to `"system"` and removes the stored preference. |
| [useResolvePath](functions/useResolvePath.md) | Resolves a sequence of path segments into an absolute path. Relative segments resolve against `process.cwd()`; if the first segment is absolute (like a `useGetDirname` result), cwd is ignored. |
| [useResolveSubject](functions/useResolveSubject.md) | Turns an authenticated principal into an access subject — the single point where authentication hands over to authorization. |
| [useRetry](functions/useRetry.md) | Retries an async function with a fixed delay between attempts. |
| [useReverse](functions/useReverse.md) | Returns a reversed copy. See [ArrayService.useReverse](classes/ArrayService.md#usereverse). |
| [useRevokeKey](functions/useRevokeKey.md) | Marks a key as revoked. See [KeyVaultService.useRevokeKey](classes/KeyVaultService.md#userevokekey). |
| [useRoles](functions/useRoles.md) | Lists every registered role definition. Returns copies, not live state. |
| [useRotateKeySecret](functions/useRotateKeySecret.md) | Rotates a key's secret. See [KeyVaultService.useRotateKeySecret](classes/KeyVaultService.md#userotatekeysecret). |
| [useRound](functions/useRound.md) | Rounds a number (or numeric string) to the specified number of decimal places. |
| [useRssHeadLink](functions/useRssHeadLink.md) | - |
| [useRun](functions/useRun.md) | Runs a pure function in a one-shot Worker and destroys it afterwards. Falls back to running on the main thread when Workers are unavailable (SSR). Async worker functions are awaited (Promise resolved before postMessage). |
| [useRunAgent](functions/useRunAgent.md) | Runs the tool-calling agent loop against a goal until it emits a final answer or exhausts `maxSteps`. |
| [useRunPool](functions/useRunPool.md) | Runs a task on an existing Worker pool. Tasks are correlated by `__taskId` so concurrent tasks do not stomp each other's handlers. |
| [useRunStorageScope](functions/useRunStorageScope.md) | Runs `fn` with request-isolated in-memory storage (SSR). Use this around a request handler so `useSetStorage` / `useGetStorage` share state within the request but not across requests. |
| [useSafeQueryFn](functions/useSafeQueryFn.md) | Bridges a KatanaKit Safe Result fetcher into a TanStack `queryFn`. |
| [useSalePrice](functions/useSalePrice.md) | Applies a discount and reports it. See [FormatterService.useSalePrice](classes/FormatterService.md#usesaleprice). |
| [useSaveVaultFile](functions/useSaveVaultFile.md) | Encrypts and writes the vault atomically. See [VaultStore.useSaveVaultFile](classes/VaultStore.md#usesavevaultfile). |
| [useScrollTo](functions/useScrollTo.md) | Scrolls the window to a specific position, respecting `prefers-reduced-motion`. |
| [useScrollToBottom](functions/useScrollToBottom.md) | Scrolls to the bottom of the page. |
| [useScrollToElement](functions/useScrollToElement.md) | Scrolls an element into view. |
| [useScrollToTop](functions/useScrollToTop.md) | Scrolls to the top of the page. |
| [useSeoMeta](functions/useSeoMeta.md) | SEO helper: one flat object in → one flat object out (+ html/tags). |
| [useSeoMetaConfig](functions/useSeoMetaConfig.md) | Returns the registered site config, falling back to the bundled demo defaults when [defineSeoMetaConfig](functions/defineSeoMetaConfig.md) was never called. |
| [useSessionExists](functions/useSessionExists.md) | Checks whether a conversation session exists. |
| [useSetAttribute](functions/useSetAttribute.md) | Sets an attribute on the target element with XSS protection. Blocks event-handler attributes (`on*`) and `javascript:` URLs. |
| [useSetDataAttribute](functions/useSetDataAttribute.md) | Sets a `data-*` attribute on the target element. |
| [useSetHtml](functions/useSetHtml.md) | Sets `innerHTML` on the target element. |
| [useSetStorage](functions/useSetStorage.md) | Stores a value under the given key (serialized as JSON). |
| [useSetTempTitle](functions/useSetTempTitle.md) | Temporarily changes the document title, restoring the original after `durationMs`. |
| [useSetText](functions/useSetText.md) | Sets the `textContent` of the target element (safe for user input). |
| [useSetThemeMode](functions/useSetThemeMode.md) | Sets the theme mode and persists it to storage. |
| [useSetTimeout](functions/useSetTimeout.md) | Cancellable delayed execution. See [TimingService.useSetTimeout](classes/TimingService.md#usesettimeout). |
| [useSetTitle](functions/useSetTitle.md) | Sets the document title. |
| [useSleep](functions/useSleep.md) | Returns a promise that resolves after `ms` milliseconds. |
| [useSlugify](functions/useSlugify.md) | Converts a text string into a URL-friendly slug. See [GeneratorService.useSlugify](classes/GeneratorService.md#useslugify). |
| [useSome](functions/useSome.md) | Whether any item matches. See [ArrayService.useSome](classes/ArrayService.md#usesome). |
| [useSomeAsync](functions/useSomeAsync.md) | Async some, short-circuiting. See [ArrayService.useSomeAsync](classes/ArrayService.md#usesomeasync). |
| [useSortBy](functions/useSortBy.md) | Sorts a copy by a derived key. See [ArrayService.useSortBy](classes/ArrayService.md#usesortby). |
| [useSplitConfig](functions/useSplitConfig.md) | Splits a `define*Config` literal into its config half and its method half. |
| [useStopMediaStream](functions/useStopMediaStream.md) | Stops all tracks in a media stream (releases camera/microphone). |
| [useStopVibration](functions/useStopVibration.md) | Stops any ongoing vibration. |
| [useSubscribeRates](functions/useSubscribeRates.md) | Subscribes to rate events (Observer). |
| [useSubtractDays](functions/useSubtractDays.md) | Subtracts a number of days from a date. |
| [useTerminate](functions/useTerminate.md) | Terminates a specific Worker pool and rejects any in-flight tasks. |
| [useTerminateAll](functions/useTerminateAll.md) | Terminates all active Worker pools and rejects any in-flight tasks. |
| [useThrottle](functions/useThrottle.md) | Leading-edge throttle. See [TimingService.useThrottle](classes/TimingService.md#usethrottle). |
| [useThrottleTrailing](functions/useThrottleTrailing.md) | Throttle with a trailing invocation. See [TimingService.useThrottleTrailing](classes/TimingService.md#usethrottletrailing). |
| [useTitle](functions/useTitle.md) | - |
| [useToCelsius](functions/useToCelsius.md) | °F → °C. See [UnitConverterService.useToCelsius](classes/UnitConverterService.md#usetocelsius). |
| [useToCm](functions/useToCm.md) | Inches → centimeters. See [UnitConverterService.useToCm](classes/UnitConverterService.md#usetocm). |
| [useToFahrenheit](functions/useToFahrenheit.md) | °C → °F. See [UnitConverterService.useToFahrenheit](classes/UnitConverterService.md#usetofahrenheit). |
| [useToggleClass](functions/useToggleClass.md) | Toggles a CSS class on the target element. |
| [useToggleTheme](functions/useToggleTheme.md) | Toggles between `"light"` and `"dark"` (ignores `"system"`). |
| [useToInches](functions/useToInches.md) | Centimeters → inches. See [UnitConverterService.useToInches](classes/UnitConverterService.md#usetoinches). |
| [useToken](functions/useToken.md) | Returns a cryptographically strong 6-digit numeric token. See [GeneratorService.useToken](classes/GeneratorService.md#usetoken). |
| [useToKilometers](functions/useToKilometers.md) | Miles → kilometers. See [UnitConverterService.useToKilometers](classes/UnitConverterService.md#usetokilometers). |
| [useToKilos](functions/useToKilos.md) | Pounds → kilograms. See [UnitConverterService.useToKilos](classes/UnitConverterService.md#usetokilos). |
| [useToMiles](functions/useToMiles.md) | Kilometers → miles. See [UnitConverterService.useToMiles](classes/UnitConverterService.md#usetomiles). |
| [useToPounds](functions/useToPounds.md) | Kilograms → pounds. See [UnitConverterService.useToPounds](classes/UnitConverterService.md#usetopounds). |
| [useTryJsonParse](functions/useTryJsonParse.md) | Parses JSON without throwing. See [ResultService.useTryJsonParse](classes/ResultService.md#usetryjsonparse). |
| [useUnique](functions/useUnique.md) | Returns a new array with duplicate values removed, preserving first-seen order. |
| [useUpperCase](functions/useUpperCase.md) | Locale-aware upper case. See [FormatterService.useUpperCase](classes/FormatterService.md#useuppercase). |
| [useUuid](functions/useUuid.md) | Generates a RFC 4122 v4 UUID string. See [GeneratorService.useUuid](classes/GeneratorService.md#useuuid). |
| [useValidate](functions/useValidate.md) | Validates unknown data against a Zod schema and returns a Safe Result. Wrapper sobre [ValidationService](classes/ValidationService.md) (backward compatibility). |
| [useValues](functions/useValues.md) | Typed `Object.values`. See [ArrayService.useValues](classes/ArrayService.md#usevalues). |
| [useVaultPath](functions/useVaultPath.md) | Resolves the vault file location. See [VaultStore.useVaultPath](classes/VaultStore.md#usevaultpath). |
| [useVerifyFileHash](functions/useVerifyFileHash.md) | Verifies a file checksum against an expected value (case-insensitive). |
| [useVibrate](functions/useVibrate.md) | Triggers the device vibration motor with a given pattern. |
| [useWatchGeolocation](functions/useWatchGeolocation.md) | Continuously watches the device's geographic position. |
| [useWorkerKeys](functions/useWorkerKeys.md) | Returns a list of all active Worker pool keys. |
| [useWriteFile](functions/useWriteFile.md) | Writes (or overwrites) a file, creating it when missing. |
| [useWriteJsonFile](functions/useWriteJsonFile.md) | Serializes data to JSON and writes it to a file (pretty-printed by default). |
