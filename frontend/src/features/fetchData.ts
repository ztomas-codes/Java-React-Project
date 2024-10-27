import { NextRequest } from 'next/server';

export const errorPrefix = 'Fetch data error';

export type Options = {
  params?: ParamsType;
  postData?: Record<string, unknown>;
  method?: 'GET' | 'POST' | 'CREATE' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  nextRequest?: NextRequest;
};

type FetchParams = { realUrl: string; init?: RequestInit };

export type ParamsType = Record<string, string | number | string[] | number[] | null | undefined>;

export const fetchData = async <T>(url: string, options?: Options): Promise<T> => {
  const { realUrl, init } = resolveFetchParams(url, options);
  const response = await fetch(realUrl, { ...(init || {}), cache: 'no-store' });
  if (!response) throw Error(`${errorPrefix}: API response for URL "${realUrl}" is ${JSON.stringify(response)}.`);
  const data = (await response.json()) as T;

  if (data === undefined) throw Error(`${errorPrefix}: Can not fetch "${realUrl}", because user is not logged in.`);
  if (typeof data === 'string' && data.includes('<style'))
    throw Error(`${errorPrefix}: Can not fetch "${realUrl}", because fatal error given: ${data}`);

  if (typeof data === 'object') {
    const d = data as { state?: unknown; message?: unknown };
    if (d.state === 'error') {
      throw Error(`Error: ${String(d?.message || '?')}. Original data: ${JSON.stringify(data)}`);
    }
  }

  return data;
};

const resolveFetchParams = (url: string, options?: Options): FetchParams => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options?.nextRequest ? createGeoIpHeaders(options.nextRequest) : {}),
    ...(options?.headers || {}),
  };

  return {
    realUrl: buildUrlWithParams(url, {
      ...options?.params,
      apiKey: String({ ...options?.params, ...options?.postData }['apiKey'] || ''),
    }),
    init:
      options && (('postData' in options && options.postData) || ('method' in options && options.method !== 'GET'))
        ? {
            method: options.method || 'POST',
            body: JSON.stringify(options.postData || {}),
            cache: 'no-cache',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            headers: headers,
          }
        : {
            headers: headers,
          },
  };
};

const buildUrlWithParams = (baseUrl: string, params: ParamsType): string => {
  const query = new URLSearchParams('');
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(`${key}[]`, String(item)));
      return;
    }
    query.set(key, String(value));
  });

  return `${removeTrailingSlash(baseUrl)}${query.toString() ? `?${query}` : ''}`;
};

const removeTrailingSlash = (str: string) => str.replace(/\/$/, '');

const createGeoIpHeaders = (request: NextRequest): Record<string, string> =>
  Object.fromEntries(
    [
      'x-forwarded-for',
      'host',
      'user-agent',
      'x-vercel-ip-latitude',
      'x-vercel-ip-longitude',
      'x-vercel-ip-city',
      'x-vercel-ip-timezone',
      'x-vercel-edge-region',
      'x-vercel-ip-country',
      'x-vercel-ip-country-region',
    ]
      .map((header) => {
        const value = request.headers.get(header);
        return { header: `brj--proxy--${header}`, value: value ? decodeURIComponent(String(value)) : undefined };
      })
      .filter(({ value }) => value)
      .map(({ header, value }) => [header, value || ''])
  );
