import { useMemo } from 'react'
import { buildApiUrl } from '@/core'
import type { UrlOptions } from '@/types'

export function useApiUrl(
  apiName: string,
  endpointName: string,
  options?: UrlOptions
): string {
  return useMemo(
    () => buildApiUrl(apiName, endpointName, options),
    [apiName, endpointName, JSON.stringify(options)]
  )
}
