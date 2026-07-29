import { z } from "zod";

// Reusable email field helper to handle mobile keyboard spaces & capitalization
const emailSchema = z.preprocess(
  (val) => (typeof val === "string" ? val.trim().toLowerCase() : val),
  z.string().min(1, "Email is required").email("Please enter a valid email"),
);

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one symbol"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const CustomerOnboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Please enter a valid phone number"),
  // Address fields
  unit: z.string().optional(),
  street: z.string().min(1, "Street is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city: z.string().min(1, "City is required"),
  city_code: z.string().optional(),
  province: z.string().min(1, "Province is required"),
  province_code: z.string().optional(),
  region: z.string().min(1, "Region is required"),
  region_code: z.string().optional(),
});

export const OwnerOnboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  storeName: z.string().min(1, "Store name is required"),
  storeDescription: z.string().min(1, "Store description is required"),
  storeType: z.enum(["carwash", "detailing", "lube_station", "others"]),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Please enter a valid phone number"),
  // Address fields
  unit: z.string().optional(),
  street: z.string().min(1, "Street is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city: z.string().min(1, "City is required"),
  city_code: z.string().optional(),
  province: z.string().min(1, "Province is required"),
  province_code: z.string().optional(),
  region: z.string().min(1, "Region is required"),
  region_code: z.string().optional(),
});
