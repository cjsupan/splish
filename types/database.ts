export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          barangay: string
          city: string
          created_at: string
          id: string
          is_default: boolean
          label: string
          lat: number | null
          lng: number | null
          province: string
          street: string
          user_id: string
        }
        Insert: {
          barangay: string
          city: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string
          lat?: number | null
          lng?: number | null
          province: string
          street: string
          user_id: string
        }
        Update: {
          barangay?: string
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string
          lat?: number | null
          lng?: number | null
          province?: string
          street?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_fulfillment: {
        Row: {
          business_id: string
          delivery_fee: number
          delivery_radius_km: number | null
          est_delivery_mins: number | null
          free_delivery_above: number | null
          id: string
          min_order_amount: number | null
          offers_delivery: boolean
          offers_pickup: boolean
        }
        Insert: {
          business_id: string
          delivery_fee?: number
          delivery_radius_km?: number | null
          est_delivery_mins?: number | null
          free_delivery_above?: number | null
          id?: string
          min_order_amount?: number | null
          offers_delivery?: boolean
          offers_pickup?: boolean
        }
        Update: {
          business_id?: string
          delivery_fee?: number
          delivery_radius_km?: number | null
          est_delivery_mins?: number | null
          free_delivery_above?: number | null
          id?: string
          min_order_amount?: number | null
          offers_delivery?: boolean
          offers_pickup?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "business_fulfillment_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          barangay: string
          category: string
          city: string
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_verified: boolean
          lat: number | null
          lng: number | null
          logo_url: string | null
          name: string
          owner_id: string
          phone: string
          province: string
          street: string
        }
        Insert: {
          barangay: string
          category: string
          city: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          lat?: number | null
          lng?: number | null
          logo_url?: string | null
          name: string
          owner_id: string
          phone: string
          province: string
          street: string
        }
        Update: {
          barangay?: string
          category?: string
          city?: string
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_verified?: boolean
          lat?: number | null
          lng?: number | null
          logo_url?: string | null
          name?: string
          owner_id?: string
          phone?: string
          province?: string
          street?: string
        }
        Relationships: [
          {
            foreignKeyName: "businesses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          qty: number
          service_id: string
          subtotal: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          qty: number
          service_id: string
          subtotal: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          qty?: number
          service_id?: string
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          business_id: string
          created_at: string
          customer_id: string
          delivery_address_id: string | null
          delivery_fee: number
          fulfillment_type: string
          id: string
          notes: string | null
          scheduled_at: string | null
          status: string
          subtotal: number
          total: number
        }
        Insert: {
          business_id: string
          created_at?: string
          customer_id: string
          delivery_address_id?: string | null
          delivery_fee?: number
          fulfillment_type: string
          id?: string
          notes?: string | null
          scheduled_at?: string | null
          status?: string
          subtotal?: number
          total?: number
        }
        Update: {
          business_id?: string
          created_at?: string
          customer_id?: string
          delivery_address_id?: string | null
          delivery_fee?: number
          fulfillment_type?: string
          id?: string
          notes?: string | null
          scheduled_at?: string | null
          status?: string
          subtotal?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_delivery_address_id_fkey"
            columns: ["delivery_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string
          role: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          business_id: string
          created_at: string
          description: string | null
          id: string
          is_available: boolean
          min_qty: number
          name: string
          price: number
          unit: string
        }
        Insert: {
          business_id: string
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean
          min_qty?: number
          name: string
          price: number
          unit: string
        }
        Update: {
          business_id?: string
          created_at?: string
          description?: string | null
          id?: string
          is_available?: boolean
          min_qty?: number
          name?: string
          price?: number
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
