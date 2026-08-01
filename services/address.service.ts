import { supabase } from "@/lib/supabase";
import { Address } from "@/types";

export const addressService = {
  async getDefaultAddress(userId: string): Promise<Address | null> {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .eq("is_default", true)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as Address | null;
  },

  async getAddresses(userId: string): Promise<Address[]> {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []) as Address[];
  },

  async getAddressById(id: string): Promise<Address | null> {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as Address | null;
  },

  async createAddress(
    address: Omit<Address, "id" | "created_at" | "updated_at">,
  ): Promise<Address> {
    const { data, error } = await supabase
      .from("addresses")
      .insert(address)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Address;
  },

  async updateAddress(id: string, updates: Partial<Address>): Promise<Address> {
    const { data, error } = await supabase
      .from("addresses")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Address;
  },

  async deleteAddress(id: string): Promise<void> {
    const { error } = await supabase.from("addresses").delete().eq("id", id);

    if (error) {
      throw error;
    }
  },

  async setDefaultAddress(userId: string, addressId: string): Promise<void> {
    const { error: clearError } = await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", userId);

    if (clearError) {
      throw clearError;
    }

    const { error } = await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", addressId);

    if (error) {
      throw error;
    }
  },
};
