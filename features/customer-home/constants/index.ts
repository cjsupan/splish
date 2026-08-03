import {
  CustomerHomeCategory,
  CustomerHomePromo,
  CustomerHomeShop,
} from "../types";

export const CUSTOMER_HOME_CATEGORIES: CustomerHomeCategory[] = [
  {
    id: "laundry",
    label: "Laundry",
  },
  {
    id: "water-delivery",
    label: "Water Delivery",
  },
  {
    id: "dry-cleaning",
    label: "Dry Cleaning",
  },
  {
    id: "ironing",
    label: "Ironing",
  },
];

export const CUSTOMER_HOME_PROMO: CustomerHomePromo = {
  id: "weekend-special",
  eyebrow: "WEEKEND SPECIAL",
  title: "Get 30% Off Premium Dry Clean",
  code: "DRY30",
};

export const CUSTOMER_HOME_SHOPS: CustomerHomeShop[] = [
  {
    id: "1",
    name: "AquaClean Premium",
    rating: 4.8,
    reviews: "120+",
    distance: "1.2 km",
    tags: ["Laundry", "Dry Clean"],
    image:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "BlueWave Water Station",
    rating: 4.9,
    reviews: "85+",
    distance: "0.8 km",
    tags: ["Purified", "Alkaline"],
    image:
      "https://images.unsplash.com/photo-1604335398941-8d7108a9e8e9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhdW5kcnklMjBzaG9wfGVufDB8fDB8fHww",
  },
  {
    id: "3",
    name: "Sudsy Express & Iron",
    rating: 4.6,
    reviews: "92+",
    distance: "2.4 km",
    tags: ["Express", "Ironing"],
    image:
      "https://images.unsplash.com/photo-1582735689149-c116c8c4bc5f?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Sparkle Clean Laundry & Dry Cleaning",
    rating: 4.7,
    reviews: "180+",
    distance: "1.5 km",
    tags: ["Laundry", "Dry Clean", "Express"],
    image:
      "https://images.unsplash.com/photo-1580468312582-056f150e3482?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Metro Pure Water & Laundry",
    rating: 4.9,
    reviews: "210+",
    distance: "0.9 km",
    tags: ["Purified", "Alkaline", "Laundry"],
    image:
      "https://images.unsplash.com/photo-1525483815183-405dae9474a5?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Crisp & Steam Laundry",
    rating: 4.5,
    reviews: "78+",
    distance: "3.1 km",
    tags: ["Laundry", "Ironing", "Express"],
    image:
      "https://images.unsplash.com/photo-1670175035240-b27b3df57402?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGF1bmRyeSUyMHNob3B8ZW58MHx8MHx8fDA%3D",
  },
];
