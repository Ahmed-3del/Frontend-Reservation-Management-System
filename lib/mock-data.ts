export type Reservation = {
    id: string;
    hotel: string;
    checkIn: string;
    checkOut: string;
    status: 'Pending' | 'Approved' | 'Cancelled';
    user: string;
    roomType: string;
    guests: number; 
    cancellationReason?: string;
  };
  


  // Mock data for popular destinations
export const popularDestinations = [
  {
    id: 1,
    name: "Hilton Hotel",
    type: "Hotel",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Grand Canyon",
    type: "National Park",
    location: "Arizona, USA",
  },
  {
    id: 3,
    name: "Eiffel Tower",
    type: "Landmark",
    location: "Paris, France",
  },
  {
    id: 4,
    name: "Sydney Opera House",
    type: "Landmark",
    location: "Sydney, Australia",
  },
  {
    id: 5,
    name: "Machu Picchu",
    type: "Historical Site",
    location: "Cusco, Peru",
  },
  {
    id: 6,
    name: "Taj Mahal",
    type: "Landmark",
    location: "Agra, India",
  },
  {
    id: 7,
    name: "Great Wall of China",
    type: "Historical Site",
    location: "Beijing, China",
  },
  {
    id: 8,
    name: "Niagara Falls",
    type: "Natural Attraction",
    location: "Ontario, Canada",
  },
  {
    id: 9,
    name: "Mount Everest",
    type: "Mountain",
    location: "Nepal",
  },
  {
    id: 10,
    name: "Serengeti National Park",
    type: "National Park",
    location: "Tanzania",
  },
]