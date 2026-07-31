// ─── Row Types (mirrors DB columns exactly) ──────────────────────────────────

export type Role = "customer" | "owner";

export interface Profile {
  id: string;
  role: Role;
  phone: string; // NOTE: DB column is "phone", not "phone_number" — align your form schema
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string; // default: "Home"
  unit: string | null;
  street: string;
  barangay: string;
  barangay_code: string;
  city: string;
  city_code: string;
  province: string;
  province_code: string;
  region: string;
  region_code: string;
  lat: number | null; // for map picker (future)
  lng: number | null;
  is_default: boolean;
  created_at: string;
}

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  description: string | null;
  phone: string; // NOTE: DB column is "phone", not "phone_number" — align your form schema
  logo_url: string | null;
  cover_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface BusinessAddress {
  id: string;
  business_id: string;
  unit: string | null;
  street: string;
  barangay: string;
  city: string;
  province: string;
  region: string | null;
  lat: number | null;
  lng: number | null;
  // NOTE: no "label" column in DB — remove from your form defaultValues
  created_at: string;
}

export interface BusinessFulfillment {
  id: string;
  business_id: string;
  offers_pickup: boolean;
  offers_delivery: boolean;
  delivery_fee: number;
  free_delivery_above: number | null;
  delivery_radius_km: number | null;
  min_order_amount: number | null;
  est_delivery_mins: number | null;
}

export interface Service {
  id: string;
  business_id: string;
  name: string;
  description: string | null; // NOTE: exists in DB — add to your form schema
  unit: string;
  price: number;
  min_qty: number;
  is_available: boolean;
  created_at: string;
}

// ─── Input Types (what you pass to API functions) ────────────────────────────

export type UpsertProfileInput = Pick<
  Profile,
  "role" | "first_name" | "last_name" | "phone"
>;

export type CreateAddressInput = Omit<Address, "id" | "user_id" | "created_at">;

export type CreateBusinessInput = Pick<
  Business,
  "name" | "category" | "description" | "phone"
>;

export type CreateBusinessAddressInput = Omit<
  BusinessAddress,
  "id" | "business_id" | "created_at"
>;

export type CreateFulfillmentInput = Omit<
  BusinessFulfillment,
  "id" | "business_id"
>;

export type CreateServiceInput = Omit<
  Service,
  "id" | "business_id" | "created_at"
>;
