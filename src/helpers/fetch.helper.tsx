/* eslint-disable @typescript-eslint/no-explicit-any */
type Params = string | string[][] | Record<string, string> | URLSearchParams | undefined;
type RequestOptionsModel = {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  isFormData?: boolean;
  params?: Params;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const createRequestUrl = (url: string, params: Params): string => {
  if (!params) {
    return `${API_BASE_URL}/${url}`;
  }
  const searchParams = new URLSearchParams(params).toString();
  return `${API_BASE_URL}/${url}?${searchParams}`;
};

const fetchHelper = async (
  url: string,
  options: RequestOptionsModel,
  body?: BodyInit | null | undefined | any
) => {
  const requestUrl = createRequestUrl(url, options.params);

  const requestOptions = {
    method: options?.method ?? 'GET',
    body: options?.isFormData ? body : JSON.stringify(body),
    next: { revalidate: 0 },
    headers: {
      ...(!options?.isFormData && { 'Content-Type': 'application/json' })
    }
  };

  const response = await fetch(requestUrl, requestOptions);

  if (!response.ok) {
    const errorResponse = await response.json();
    const customError = new Error(`${errorResponse.message}`);
    (customError as any).response = response; // Attaching the response to the error object for access in the app component
    throw customError; // Throw the custom error object
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  } else {
    return; // No need to parse response if not JSON
  }
};

export default fetchHelper;
