import { z } from "zod";

const e164PhoneSchema = z
  .string()
  .regex(/^\+639\d{9}$/, "Phone number must be in +639XXXXXXXXX format");

// ==========================================
// 1. Reusable Sub-Schemas
// ==========================================
export const addressSchema = z.object({
  label: z.string().min(1, "Address label is required"),
  unit: z.string().optional(),
  street: z.string().min(1, "Street address is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  region: z.string().min(1, "Region is required"),
});

export const serviceItemSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  unit: z.string().min(1, "Unit is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  min_qty: z.number().min(1, "Minimum quantity must be at least 1"),
  is_available: z.boolean().default(true),
});

export const businessSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters"),
  category: z.enum(["laundry", "water_refill", "both"]),
  description: z.string().optional(),
  phone_number: e164PhoneSchema,
  services: z
    .array(serviceItemSchema)
    .min(1, "At least one service is required"),
  address: addressSchema,
});

// ==========================================
// 2. Base Profile Schema (Shared Fields)
// ==========================================
const baseProfileSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  phone_number: e164PhoneSchema,
  avatar: z.string().optional(),
  address: addressSchema, // Customer personal address
});

// ==========================================
// 3. Discriminator Branches
// ==========================================
export const customerOnboardingSchema = baseProfileSchema.extend({
  role: z.literal("customer"),
});

export const ownerOnboardingSchema = baseProfileSchema.extend({
  role: z.literal("owner"),
  business: businessSchema,
});

// ==========================================
// 4. Combined Discriminated Union
// ==========================================
export const onboardingSchema = z.discriminatedUnion("role", [
  customerOnboardingSchema,
  ownerOnboardingSchema,
]);

// ==========================================
// 5. Exported Types
// ==========================================
/** Final parsed output type after submission */
export type OnboardingFormData = z.infer<typeof onboardingSchema>;

/** Raw input shape before transformation (used for useForm generics) */
export type OnboardingFormInput = z.input<typeof onboardingSchema>;

export type Role = OnboardingFormData["role"];
export type StepKey =
  "PERSONAL" | "PHONE_VERIFY" | "ADDRESS" | "BUSINESS" | "BUSINESS_ADDRESS";
