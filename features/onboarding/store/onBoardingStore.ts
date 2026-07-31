import { create } from "zustand";
import { UserRole, BusinessCategory, ServiceUnit } from "@/types";

interface AddressInput {
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
  lat: number | null;
  lng: number | null;
}

interface OnboardingState {
  role: UserRole | null;

  personal: {
    first_name: string;
    last_name: string;
    phone: string;
  };

  phoneVerified: boolean;

  address: AddressInput;

  business: {
    name: string;
    category: BusinessCategory;
    description: string;
    phone: string;
    logo_url: string | null;
    cover_url: string | null;
    is_active: boolean;
  };

  businessAddress: AddressInput;

  services: Array<{
    name: string;
    description: string | null;
    unit: ServiceUnit;
    price: number;
    min_qty: number;
    is_available: boolean;
  }>;

  // Actions
  setRole: (role: UserRole) => void;
  setPersonal: (data: Partial<OnboardingState["personal"]>) => void;
  setPhoneVerified: (verified: boolean) => void;
  setAddress: (data: Partial<AddressInput>) => void;
  setBusiness: (data: Partial<OnboardingState["business"]>) => void;
  setBusinessAddress: (data: Partial<AddressInput>) => void;
  addService: (service: OnboardingState["services"][0]) => void;
  removeService: (index: number) => void;
  resetStore: () => void;
}

const initialAddressState: AddressInput = {
  label: "",
  unit: "",
  street: "",
  barangay: "",
  barangay_code: "",
  city: "",
  city_code: "",
  province: "",
  province_code: "",
  region: "",
  region_code: "",
  lat: 0,
  lng: 0,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  role: null,
  personal: { first_name: "", last_name: "", phone: "" },
  phoneVerified: false,
  address: initialAddressState,
  business: {
    name: "",
    category: "laundry",
    description: "",
    phone: "",
    logo_url: null,
    cover_url: null,
    is_active: true,
  },
  businessAddress: initialAddressState,
  services: [],

  setRole: (role) => set({ role }),
  setPersonal: (data) =>
    set((state) => ({ personal: { ...state.personal, ...data } })),
  setPhoneVerified: (phoneVerified) => set({ phoneVerified }),
  setAddress: (data) =>
    set((state) => ({ address: { ...state.address, ...data } })),
  setBusiness: (data) =>
    set((state) => ({ business: { ...state.business, ...data } })),
  setBusinessAddress: (data) =>
    set((state) => ({
      businessAddress: { ...state.businessAddress, ...data },
    })),
  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),
  removeService: (index) =>
    set((state) => ({
      services: state.services.filter((_, i) => i !== index),
    })),

  resetStore: () =>
    set({
      role: null,
      personal: { first_name: "", last_name: "", phone: "" },
      phoneVerified: false,
      address: initialAddressState,
      business: {
        name: "",
        category: "laundry",
        description: "",
        phone: "",
        logo_url: null,
        cover_url: null,
        is_active: true,
      },
      businessAddress: initialAddressState,
      services: [],
    }),
}));
