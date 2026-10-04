const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://tour-trip-etec-sun-11.duckdns.org';

/**
 * Basic wrapper around fetch for handling common API tasks
 * like JSON parsing, error throwing, and headers.
 */
export async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const token = localStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

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
            const fieldErrors = data?.errors ? Object.values(data.errors).flat() : [];
            throw new Error(data?.message || fieldErrors[0] || `API Error: ${response.status} ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error; // Re-throw to be handled by the component
    }
}
