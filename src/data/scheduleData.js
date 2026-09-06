// Mock data for Tour Schedule Management.
// Swap STATIC_SCHEDULES for a real API call later — see note at bottom.

export const TOUR_OPTIONS = [
  {
    id: "angkor-wat-sunrise",
    name: "Angkor Wat Sunrise Adventure",
    destination: "Siem Reap, Cambodia",
  },
  {
    id: "halong-bay-cruise",
    name: "Luxury Ha Long Bay Cruise",
    destination: "Ha Long Bay, Vietnam",
  },
  {
    id: "kyoto-fuji-tour",
    name: "Classic Kyoto Temples & Mount Fuji Tour",
    destination: "Kyoto, Japan",
  },
  {
    id: "phuket-island-hop",
    name: "Phi Phi Islands Speedboat Escape",
    destination: "Phuket, Thailand",
  },
  {
    id: "bali-rice-terrace",
    name: "Ubud Rice Terraces & Temple Trek",
    destination: "Ubud, Bali, Indonesia",
  },
  {
    id: "hanoi-street-food",
    name: "Hanoi Old Quarter Food Walking Tour",
    destination: "Hanoi, Vietnam",
  },
];

export const GUIDE_OPTIONS = [
  "Sokha Ren",
  "Minh Tran",
  "Yuki Tanaka",
  "Nira Suwannee",
  "Made Wirawan",
];

export const STATUS_OPTIONS = ["Confirmed", "Pending", "Full", "Cancelled"];

export const STATIC_SCHEDULES = [
  {
    id: "sch_001",
    tourId: "angkor-wat-sunrise",
    date: "2026-09-12",
    time: "05:30",
    guide: "Sokha Ren",
    seatsBooked: 9,
    seatsTotal: 15,
    status: "Confirmed",
  },
  {
    id: "sch_002",
    tourId: "halong-bay-cruise",
    date: "2026-09-18",
    time: "08:00",
    guide: "Minh Tran",
    seatsBooked: 20,
    seatsTotal: 20,
    status: "Full",
  },
  {
    id: "sch_003",
    tourId: "kyoto-fuji-tour",
    date: "2026-08-25",
    time: "07:00",
    guide: "Yuki Tanaka",
    seatsBooked: 6,
    seatsTotal: 10,
    status: "Pending",
  },
  {
    id: "sch_004",
    tourId: "hanoi-street-food",
    date: "2026-08-10",
    time: "18:30",
    guide: "Minh Tran",
    seatsBooked: 8,
    seatsTotal: 12,
    status: "Confirmed",
  },
];

/*
BACKEND SWAP NOTE:
When a real backend exists, fetch schedules inside ScheduleManagement.jsx
(or a hook) instead of importing STATIC_SCHEDULES directly:

  const [schedules, setSchedules] = useState([]);
  useEffect(() => { api.getSchedules().then(setSchedules); }, []);

Until then, ScheduleManagement.jsx seeds its state from STATIC_SCHEDULES
and persists edits to localStorage so add/edit/delete survive refreshes.
*/
