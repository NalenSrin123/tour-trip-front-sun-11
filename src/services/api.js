const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Basic wrapper around fetch for handling common API tasks
 * like JSON parsing, error throwing, and headers.
 */
export async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // If you need to add an auth token later, you can do it here:
    // const token = localStorage.getItem('token');
    // if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        }

        if (!response.ok) {
            throw new Error(data?.message || `API Error: ${response.status} ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error; // Re-throw to be handled by the component
    }
}
