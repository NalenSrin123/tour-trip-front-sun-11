import { initialCustomers} from "../data/customerMockData"; // or initialCustomers

const STORAGE_KEY = "app_customers";

// Helper: Get data safely from localStorage or initialize with mock data
const getStoredCustomers = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customerMockData || []));
      return customerMockData || [];
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return customerMockData || [];
  }
};

/**
 * FAKE API: Fetch all customers (GET /api/customers)
 */
export const fetchCustomers = async () => {
  // Always fetch fresh data directly from storage
  return getStoredCustomers();
};

/**
 * FAKE API: Create a new customer (POST /api/customers)
 */
export const createCustomer = async (customerData) => {
  const currentList = getStoredCustomers();

  // 1. Build structured customer object matching table properties
  const newCustomer = {
    id: Date.now().toString(),
    name: customerData.name || "Unnamed Customer",
    email: customerData.email || "N/A",
    phone: customerData.phone || "N/A",
    status: customerData.status || "Active",
    avatar: "",
    bookings: 0,
    totalSpent: "$0.00",
    joined: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  // 2. Prepend to list & persist to localStorage
  const updatedList = [newCustomer, ...currentList];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

  // 3. Notify window listeners that customer data updated
  window.dispatchEvent(new Event("customersUpdated"));

  return newCustomer;
};