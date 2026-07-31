import { z } from "zod";

const e164PhoneSchema = z
  .string()
  .regex(/^\+639\d{9}$/, "Phone number must be in +639XXXXXXXXX format");

// ==========================================
// 1. Reusable Step Schemas
// ==========================================

// Step 1: Role Selection
export const roleSchema = z.object({
  role: z.enum(["customer", "owner"], {
    error: "Please select a valid role",
  }),
});

// Step 2: Personal Details
export const personalDetailsSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  phone: e164PhoneSchema,
});

// Step 3: Phone Verification Code
export const tokenSchema = z.object({
  token: z.string().length(6, "Token must be 6 digits"),
});

// Step 4 & 6: Address (Customer Address & Business Address)
export const addressSchema = z.object({
  label: z.string(),
  unit: z.string().nullable(),
  street: z.string().min(1, "Street address is required"),
  barangay: z.string().min(1, "Barangay is required"),
  barangay_code: z.string().min(1, "Barangay code is required"),
  city: z.string().min(1, "City is required"),
  city_code: z.string().min(1, "City code is required"),
  province: z.string().min(1, "Province is required"),
  province_code: z.string().min(1, "Province code is required"),
  region: z.string().min(1, "Region is required"),
  region_code: z.string().min(1, "Region code is required"),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
});

export const businessAddressSchema = z.object({
  unit: z.string().nullable(),
  street: z.string().min(1, "Street address is required"),
  barangay: z.string().min(1, "Barangay is required"),
  barangay_code: z.string().min(1, "Barangay code is required"),
  city: z.string().min(1, "City is required"),
  city_code: z.string().min(1, "City code is required"),
  province: z.string().min(1, "Province is required"),
  province_code: z.string().min(1, "Province code is required"),
  region: z.string().min(1, "Region is required"),
  region_code: z.string().min(1, "Region code is required"),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
});

// Step 5: Business Details
export const businessDetailsSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  category: z.enum(["laundry", "water_station"], {
    error: "Please select a valid business category",
  }),
  description: z.string().optional(),
  phone: e164PhoneSchema,
  logo_url: z.string().nullable().optional(),
  cover_url: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
});

// Step 7: Services Item Schema
export const serviceItemSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().nullable(),
  unit: z.enum(["kg", "gallon", "piece", "load"], {
    error: "Please select a valid unit",
  }),
  price: z.number().min(0, "Price must be 0 or greater"),
  min_qty: z.number().min(1, "Minimum quantity must be at least 1"),
  is_available: z.boolean().default(true),
});

export const servicesArraySchema = z.object({
  services: z
    .array(serviceItemSchema)
    .min(1, "At least one service is required"),
});

// ==========================================
// 2. Final Comprehensive Payload Schema (For RPC)
// ==========================================
export const customerCompleteSchema = z.object({
  role: z.literal("customer"),
  profile: personalDetailsSchema,
  address: addressSchema,
});

export const ownerCompleteSchema = z.object({
  role: z.literal("owner"),
  profile: personalDetailsSchema,
  address: addressSchema,
  business: businessDetailsSchema.and(addressSchema), // Combines business details + business address
  services: z
    .array(serviceItemSchema)
    .min(1, "At least one service is required"),
});

export const completeOnboardingSchema = z.discriminatedUnion("role", [
  customerCompleteSchema,
  ownerCompleteSchema,
]);

// ==========================================
// 3. Exported Types
// ==========================================
export type TokenFormInput = z.input<typeof tokenSchema>;
export type TokenFormData = z.output<typeof tokenSchema>;

export type RoleFormInput = z.input<typeof roleSchema>;
export type RoleFormData = z.output<typeof roleSchema>;

export type PersonalDetailsFormInput = z.input<typeof personalDetailsSchema>;
export type PersonalDetailsFormData = z.output<typeof personalDetailsSchema>;

export type AddressFormInput = z.input<typeof addressSchema>;
export type AddressFormData = z.output<typeof addressSchema>;

export type BusinessDetailsFormInput = z.input<typeof businessDetailsSchema>;
export type BusinessDetailsFormData = z.output<typeof businessDetailsSchema>;

export type BusinessAddressFormInput = z.input<typeof businessAddressSchema>;
export type BusinessAddressFormData = z.output<typeof businessAddressSchema>;

export type ServiceItemFormInput = z.input<typeof serviceItemSchema>;
export type ServiceItemFormData = z.output<typeof serviceItemSchema>;

export type CompleteOnboardingPayload = z.infer<
  typeof completeOnboardingSchema
>;

export type StepKey =
  | "ROLE"
  | "PERSONAL"
  | "PHONE_VERIFY"
  | "ADDRESS"
  | "BUSINESS"
  | "BUSINESS_ADDRESS"
  | "SERVICES"
  | "DONE";
