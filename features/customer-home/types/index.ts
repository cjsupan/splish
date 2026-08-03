export interface CustomerHomeCategory {
  id: string;
  label: string;
}

export interface CustomerHomeShop {
  id: string;
  name: string;
  rating: number;
  reviews: string;
  distance: string;
  tags: string[];
  image: string;
}

export interface CustomerHomePromo {
  id: string;
  eyebrow: string;
  title: string;
  code: string;
}
