import axios, { type AxiosRequestConfig } from 'axios';

export async function AXIOS_FETCH<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T | null> {
  try {
    const response = await axios.request<T>({ url, ...config });
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    return null;
  }
}

export async function FETCH_REQUEST<T>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.error(`Fetch error: ${response.status}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetch network error:', error);
    return null;
  }
}

export async function POST<TResponse, TBody>(
  url: string,
  body: TBody
): Promise<TResponse | null> {
  return FETCH_REQUEST<TResponse>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function STRINGIFY_QUERY(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  return searchParams.toString();
}