/* eslint-disable @typescript-eslint/no-explicit-any */
type FetchParams = Record<string, string | number | boolean>;
type HeadersObject = Record<string, string>;

// Fetch GET
export const fetchGet = async (url: string, params: FetchParams = {}, token?: string) => {
  try {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const headers: HeadersObject = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('🚀 ~ fetchGet ~ error:', error);
    throw new Error(`An error occurred during fetch GET: ${(error as Error).message}`);
  }
};

// Fetch POST
export const fetchPost = async (
  url: string,
  body: any,
  token?: string,
  params: FetchParams = {}
) => {
  try {
    const headers: HeadersObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('🚀 ~ fetchPost ~ error:', error);
    throw new Error(`An error occurred during fetch POST: ${(error as Error).message}`);
  }
};

// Fetch POST FormData
export const fetchPostFormData = async (url: string, formData: FormData, token?: string) => {
  try {
    const headers: HeadersObject = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('🚀 ~ fetchPostFormData ~ error:', error);
    throw new Error(`An error occurred during fetch POST: ${(error as Error).message}`);
  }
};

// Fetch PUT
export const fetchPut = async (url: string, body: any, token?: string) => {
  try {
    const headers: HeadersObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('🚀 ~ fetchPut ~ error:', error);
    throw new Error(`An error occurred during fetch PUT: ${(error as Error).message}`);
  }
};

// Fetch PATCH
export const fetchPatch = async (url: string, body: any, token?: string) => {
  try {
    const headers: HeadersObject = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('🚀 ~ fetchPatch ~ error:', error);
    throw new Error(`An error occurred during fetch PATCH: ${(error as Error).message}`);
  }
};

// Fetch PATCH FormData
export const fetchPatchFormData = async (url: string, formData: FormData, token?: string) => {
  try {
    const headers: HeadersObject = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: formData,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('🚀 ~ fetchPatchFormData ~ error:', error);
    throw new Error(`An error occurred during fetch PATCH: ${(error as Error).message}`);
  }
};

// Fetch DELETE
export const fetchDelete = async (url: string, params: FetchParams = {}, token?: string) => {
  try {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const headers: HeadersObject = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('🚀 ~ fetchDelete ~ error:', error);
    throw new Error(`An error occurred during fetch DELETE: ${(error as Error).message}`);
  }
};
