import { initialTours } from "../data/tourMockdata";

const STORAGE_KEY = "app_tours";

// Helper: Get data safely from localStorage or initialize with mock data
const getStoredTours = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTours));
      return initialTours;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return initialTours;
  }
};

/**
 * FAKE API: Fetch all tours (GET /api/tours)
 */
export const fetchTours = async () => {
  // Always fetch fresh data directly from storage
  return getStoredTours();
};

/**
 * FAKE API: Create a new tour (POST /api/tours)
 */
export const createTour = async (tourData) => {
  const currentList = getStoredTours();

  // 1. Build structured tour object matching table properties
  const newTour = {
    id: `TR-${Date.now().toString().slice(-4)}`,
    title: tourData.title || "Untitled Tour",
    destination: tourData.destination || "N/A",
    category: tourData.category || "Cultural",
    duration: tourData.duration || "Full Day (8h)",
    price: Number(tourData.price) || 0,
    rating: tourData.rating || "4.5",
    reviews: tourData.reviews || "0",
    status: tourData.status || "Draft",
    image:
      tourData.image ||
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
  };

  // 2. Prepend to list & persist to localStorage
  const updatedList = [newTour, ...currentList];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

  // 3. Notify window listeners that tour data updated
  window.dispatchEvent(new Event("toursUpdated"));

  return newTour;
};