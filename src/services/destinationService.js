import { apiFetch } from './api';

// MOCK DATA: Temporary fallback while backend is not fully connected.
let MOCK_DESTINATIONS = [
    {
        id: 1,
        name: 'Siem Reap',
        country: 'Cambodia',
        activeTours: 24,
        bookings: '1,420',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 2,
        name: 'Phnom Penh',
        country: 'Cambodia',
        activeTours: 18,
        bookings: '850',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1508804039813-1a0671607542?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 3,
        name: 'Battambang',
        country: 'Cambodia',
        activeTours: 5,
        bookings: '120',
        status: 'Inactive',
        image: 'https://images.unsplash.com/photo-1596401057633-5c14d7a8684d?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 4,
        name: 'Kampot',
        country: 'Cambodia',
        activeTours: 12,
        bookings: '430',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1582236377759-3fb70dbdb6df?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 5,
        name: 'Koh Rong',
        country: 'Cambodia',
        activeTours: 8,
        bookings: '650',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 6,
        name: 'Mondulkiri',
        country: 'Cambodia',
        activeTours: 3,
        bookings: '85',
        status: 'Draft',
        image: 'https://images.unsplash.com/photo-1621528656111-eec73b18cb74?auto=format&fit=crop&q=80&w=800',
    }
];

export const destinationService = {
    /**
     * Fetches all destinations from the API
     */
    async getDestinations() {
        // TODO: Uncomment the real API call below when backend is ready
        // return await apiFetch('/destinations');
        
        // MOCK implementation for UI testing
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...MOCK_DESTINATIONS]);
            }, 600); // simulate network delay
        });
    },

    /**
     * Creates a new destination
     */
    async createDestination(data) {
        // TODO: Uncomment the real API call below when backend is ready
        // return await apiFetch('/destinations', {
        //     method: 'POST',
        //     body: JSON.stringify(data)
        // });

        // MOCK implementation for UI testing
        return new Promise((resolve) => {
            setTimeout(() => {
                const newDest = {
                    id: Date.now(), // Generate a unique ID
                    activeTours: 0,
                    bookings: '0',
                    ...data,
                    // Default image if empty
                    image: data.image || 'https://images.unsplash.com/photo-1508804039813-1a0671607542?auto=format&fit=crop&q=80&w=800'
                };
                MOCK_DESTINATIONS = [newDest, ...MOCK_DESTINATIONS];
                resolve(newDest);
            }, 600);
        });
    },

    /**
     * Updates an existing destination
     */
    async updateDestination(id, data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = MOCK_DESTINATIONS.findIndex(d => d.id === id);
                if (index !== -1) {
                    MOCK_DESTINATIONS[index] = { ...MOCK_DESTINATIONS[index], ...data };
                    resolve(MOCK_DESTINATIONS[index]);
                } else {
                    resolve(null);
                }
            }, 600);
        });
    },

    /**
     * Deletes a destination
     */
    async deleteDestination(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                MOCK_DESTINATIONS = MOCK_DESTINATIONS.filter(d => d.id !== id);
                resolve(true);
            }, 600);
        });
    }
};
