import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { addressService } from "@/services/address.service";
import { Address } from "@/types";

export function useAddress() {
  const userId = useAuthStore((state) => state.session?.user.id);

  return useQuery<Address | null>({
    queryKey: ["address", "default", userId],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      if (!userId) {
        return null;
      }

      return addressService.getDefaultAddress(userId);
    },
  });
}

export function useAddresses() {
  const userId = useAuthStore((state) => state.session?.user.id);

  return useQuery<Address[]>({
    queryKey: ["addresses", userId],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      if (!userId) {
        return [];
      }

      return addressService.getAddresses(userId);
    },
  });
}

export function useAddressById(addressId?: string) {
  return useQuery<Address | null>({
    queryKey: ["address", addressId],
    enabled: !!addressId,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      if (!addressId) {
        return null;
      }

      return addressService.getAddressById(addressId);
    },
  });
}
