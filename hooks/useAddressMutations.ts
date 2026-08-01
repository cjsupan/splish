import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { addressService } from "@/services/address.service";
import { Address } from "@/types";

export function useCreateAddress() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user.id);

  return useMutation({
    mutationFn: (address: Omit<Address, "id" | "created_at" | "updated_at">) =>
      addressService.createAddress(address),
    onSuccess: () => {
      if (!userId) return;

      queryClient.invalidateQueries({
        queryKey: ["addresses", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["address", "default", userId],
      });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user.id);

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Address> }) =>
      addressService.updateAddress(id, updates),
    onSuccess: (_, variables) => {
      if (!userId) return;

      queryClient.invalidateQueries({
        queryKey: ["addresses", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["address", "default", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["address", variables.id],
      });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user.id);

  return useMutation({
    mutationFn: (id: string) => addressService.deleteAddress(id),
    onSuccess: (_, id) => {
      if (!userId) return;

      queryClient.invalidateQueries({
        queryKey: ["addresses", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["address", "default", userId],
      });

      queryClient.removeQueries({
        queryKey: ["address", id],
      });
    },
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.session?.user.id);

  return useMutation({
    mutationFn: (addressId: string) => {
      if (!userId) {
        throw new Error("User is not authenticated.");
      }

      return addressService.setDefaultAddress(userId, addressId);
    },
    onSuccess: () => {
      if (!userId) return;

      queryClient.invalidateQueries({
        queryKey: ["addresses", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["address", "default", userId],
      });
    },
  });
}
