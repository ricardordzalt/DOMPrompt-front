export const fetchGet = async (url, params = {}, token) => {
  try {
    // Construir la URL con los parámetros
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const headers = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    console.log('🚀 ~ fetchGet ~ fullUrl:', fullUrl);

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.log('🚀 ~ fetchGet ~ error:', error);
    throw new Error(`An error occurred during fetch GET: ${error.message}`);
  }
};

export const fetchPost = async (url, body, token?, params = {}) => {
  try {
    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`An error occurred during fetch POST: ${error.message}`);
  }
};

export const fetchPostFormData = async (url, formData, token?) => {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`An error occurred during fetch POST: ${error.message}`);
  }
};

export const fetchPut = async (url, body, token) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`An error occurred during fetch PUT: ${error.message}`);
  }
};

export const fetchPatch = async (url, body, token?) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`An error occurred during fetch PATCH: ${error.message}`);
  }
};

export const fetchPatchFormData = async (url, formData, token) => {
  try {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: formData,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`An error occurred during fetch PATCH: ${error.message}`);
  }
};

export const fetchDelete = async (url, params = {}, token) => {
  try {
    // Construir la URL con los parámetros de consulta
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const headers = {
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`An error occurred during fetch DELETE: ${error.message}`);
  }
};
