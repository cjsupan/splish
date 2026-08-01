import { useState } from "react";
import { useOnboardingStore } from "../store/onBoardingStore";
import { submitCompleteOnboarding } from "../api/onboarding.api";
import { useAuthStore } from "@/store/authStore";

export function useOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resetStore = useOnboardingStore((state) => state.resetStore);
  const { fetchProfile, session } = useAuthStore();

  const submitOnboarding = async () => {
    setIsSubmitting(true);
    try {
      // 1. Grab snapshot of current state from Zustand store
      const storeState = useOnboardingStore.getState();

      // 2. Build the massive payload mapped to your database schema types
      const payload = {
        role: storeState.role,
        profile: {
          first_name: storeState.personal.first_name,
          last_name: storeState.personal.last_name,
          phone: storeState.personal.phone,
        },
        address: {
          ...storeState.address,
          is_default: true,
        },
        // Conditionally append owner-specific details if role is 'owner'
        ...(storeState.role === "owner" && {
          business: {
            name: storeState.business.name,
            category: storeState.business.category,
            description: storeState.business.description,
            phone: storeState.business.phone,
            logo_url: storeState.business.logo_url,
            cover_url: storeState.business.cover_url,
            is_active: storeState.business.is_active,
            // Business Address fields mapped directly to the business object
            unit: storeState.businessAddress.unit,
            street: storeState.businessAddress.street,
            barangay: storeState.businessAddress.barangay,
            barangay_code: storeState.businessAddress.barangay_code,
            city: storeState.businessAddress.city,
            city_code: storeState.businessAddress.city_code,
            province: storeState.businessAddress.province,
            province_code: storeState.businessAddress.province_code,
            region: storeState.businessAddress.region,
            region_code: storeState.businessAddress.region_code,
            lat: storeState.businessAddress.lat,
            lng: storeState.businessAddress.lng,
          },
          services: storeState.services,
        }),
      };

      // 3. Send everything in one request to your API
      await submitCompleteOnboarding(payload);

      // fetch profile from supabase
      await fetchProfile(session?.user?.id!);

      // 4. Clear the temporary onboarding store data upon success
      resetStore();

      return true;
    } catch (error) {
      console.error("Onboarding submission error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitOnboarding,
    isSubmitting,
  };
}
