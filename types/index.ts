// ─── User / Auth ────────────────────────────────────────────────────────────

export type UserRole = "customer" | "owner";

export interface Profile {
  id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone: string;
  avatar_url: string | null;
  onboarding_step: number;
  onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Addresses ───────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  user_id: string;
  label: string;
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
  lat: number;
  lng: number;
  is_default: boolean;
}

// ─── Business ────────────────────────────────────────────────────────────────

export type BusinessCategory = "laundry" | "water_station";

export interface Business {
  id: string;
  owner_id: string;
  name: string;
  category: BusinessCategory;
  description: string | null;
  phone: string;
  logo_url: string | null;
  cover_url: string | null;
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
  lat: number;
  lng: number;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
}

// ─── Fulfillment Options ─────────────────────────────────────────────────────

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

export type FulfillmentType = "pickup" | "delivery";

// ─── Services ────────────────────────────────────────────────────────────────

export type ServiceUnit = "kg" | "gallon" | "piece" | "load";

export interface Service {
  id: string;
  business_id: string;
  name: string;
  description: string | null;
  unit: ServiceUnit;
  price: number;
  min_qty: number;
  is_available: boolean;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "picked_up"
  | "processing"
  | "ready"
  | "out_for_delivery"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;
  customer_id: string;
  business_id: string;
  fulfillment_type: FulfillmentType;
  status: OrderStatus;
  delivery_address_id: string | null;
  scheduled_at: string | null;
  notes: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  service_id: string;
  qty: number;
  unit_price: number;
  subtotal: number;
  // joined
  service?: Service;
}

// ─── Joined / View Types ─────────────────────────────────────────────────────

export interface BusinessWithFulfillment extends Business {
  fulfillment: BusinessFulfillment;
  services: Service[];
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
  business?: Pick<Business, "id" | "name" | "logo_url" | "category">;
  delivery_address?: Address;
}

// ─── Status helpers ───────────────────────────────────────────────────────────

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  picked_up: "Picked Up",
  processing: "Processing",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  completed: "Completed",
  cancelled: "Cancelled",
};
