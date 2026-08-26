export type ApisConfig = Record<string, ApiEntry>
export interface ApiEntry {
  baseUri: string
  endpoints?: Record<string, string>
  defaultQueryParams?: Record<string, Record<string, string | number>>
}

export interface UrlOptions {
  params?: Record<string, string | number>
  query?: Record<string, string | number | boolean>
}

export interface FetchOptions<T = unknown> extends UrlOptions, Omit<RequestInit, 'body'> {
  body?: BodyInit | null
}

export interface FetchResult<T> {
  data: T
  url: string
  status: number
  ok: boolean
}


export default class ApiManager {
    
    private str: string = ''
    private apis: ApisConfig;
    private apiEntry: ApiEntry;
    private options: UrlOptions;
    private fetchOpts: FetchResult && FetchOptions;    
    
    private constructor() {
        this.apis = {}
        this.api
    }
    
    
    static trim(str: string): string {
         this.str.trim()
    }
    
    static normalizar(raw: Record<string, unknown>): ApisConfig {
          const out: ApisConfig = {}
        
          for (const [key, val] of Object.entries(raw)) {
            const v = val as Record<string, unknown>
            const endpoints = (v.endpoints ?? v.routes ?? {}) as Record<string, string>
            const baseUri = trim(String(v.baseUri ?? v.baseUrl ?? '')).replace(/\/+$/, '')
            const rawDefaults = (v.defaultQueryParams ?? {}) as Record<string, Record<string, unknown>>
        
            const defaults: Record<string, Record<string, string | number>> = {}
            for (const [ep, qs] of Object.entries(rawDefaults)) {
              defaults[trim(ep)] = {}
              for (const [qk, qv] of Object.entries(qs)) {
                defaults[trim(ep)][trim(qk)] = qv as string | number
              }
            }
        
            out[trim(key)] = {
              baseUri,
              endpoints: Object.fromEntries(
                Object.entries(endpoints).map(([k, p]) => [trim(k), trim(p)])
              ),
              defaultQueryParams: defaults,
            }
          }
        
          return out
      }
      
    static  initApis(source: Record<string, unknown>): ApisConfig {
        this.apis = this.normalizar(source)
        return this.apis;
    }

}



export function initApis(source: Record<string, unknown>): ApisConfig {
  _apis = normalizar(source)
  return _apis
}

export function getApis(): ApisConfig {
  return _apis
}

export function buildApiUrl(
  apiName: string,
  endpointName: string,
  options: UrlOptions = {}
): string {
  const api = _apis[apiName]
  if (!api) {
    throw new Error(`API "${apiName}" not found. Available: ${Object.keys(_apis).join(', ')}`)
  }

  const template = api.endpoints[endpointName]
  if (!template) {
    throw new Error(
      `Endpoint "${endpointName}" not found in "${apiName}". Available: ${Object.keys(api.endpoints).join(', ')}`
    )
  }

  let path = template
  if (options.params) {
    for (const [k, v] of Object.entries(options.params)) {
      path = path.replace(new RegExp(`:${k}\\b`, 'g'), encodeURIComponent(String(v)))
    }
  }

  const defaults = api.defaultQueryParams?.[endpointName] ?? {}
  const merged: Record<string, string> = {}

  for (const [k, v] of Object.entries(defaults)) {
    merged[k] = String(v)
  }

  if (options.query) {
    for (const [k, v] of Object.entries(options.query)) {
      if (v === undefined || v === null) {
        delete merged[k]
      } else {
        merged[k] = String(v)
      }
    }
  }

  const url = new URL(`${api.baseUri}${path}`)
  for (const [k, v] of Object.entries(merged)) {
    url.searchParams.set(k, v)
  }

  return url.toString()
}

export async function fetchApi<T = unknown>(
  apiName: string,
  endpointName: string,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  const { params, query, ...init } = options
  const url = buildApiUrl(apiName, endpointName, { params, query })

  const res = await fetch(url, init)

  if (!res.ok) {
    throw new Error(`API Error [${apiName}/${endpointName}]: ${res.status} ${res.statusText}`)
  }

  const data = (await res.json()) as T

  return { data, url, status: res.status, ok: res.ok }
}
