const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
});

export const apiGet = async (urlExtension) => {
    try {
        const response = await fetch(`${BASE_URL}${urlExtension}`, {
        method: 'GET',
        headers: getHeaders()
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
};

export const apiPost = async (urlExtension, data) => {
    try {
      const response = await fetch(`${BASE_URL}${urlExtension}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
};

export const apiPut = async (urlExtension, data) => {
    try {
      const response = await fetch(`${BASE_URL}${urlExtension}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      data = await response.json();
      return data
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  };


export const apiDelete = async (urlExtension) => {
    try {
      const response = await fetch(`${BASE_URL}${urlExtension}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  };