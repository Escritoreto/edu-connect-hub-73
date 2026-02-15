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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      course_enrollments: {
        Row: {
          city: string
          created_at: string
          email: string
          id: string
          name: string
          payment_status: string | null
          phone: string
          publication_id: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          id?: string
          name: string
          payment_status?: string | null
          phone: string
          publication_id: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          payment_status?: string | null
          phone?: string
          publication_id?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_downloads: {
        Row: {
          created_at: string
          cv_name: string
          id: string
          template_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          cv_name: string
          id?: string
          template_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          cv_name?: string
          id?: string
          template_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      publication_views: {
        Row: {
          id: string
          publication_id: string
          user_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: string
          publication_id: string
          user_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: string
          publication_id?: string
          user_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "publication_views_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          area: string | null
          benefits: Json | null
          category: Database["public"]["Enums"]["publication_category"]
          country: string | null
          country_info: Json | null
          created_at: string
          created_by: string | null
          deadline: string | null
          description: string
          external_link: string | null
          id: string
          image_url: string | null
          important_dates: Json | null
          is_featured: boolean | null
          requirements: string | null
          scholarship_type: string | null
          short_description: string | null
          status: string | null
          study_level: string | null
          title: string
          university_logo: string | null
          updated_at: string
          vacancies_by_country: Json | null
          value: string | null
          views_count: number | null
        }
        Insert: {
          area?: string | null
          benefits?: Json | null
          category: Database["public"]["Enums"]["publication_category"]
          country?: string | null
          country_info?: Json | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description: string
          external_link?: string | null
          id?: string
          image_url?: string | null
          important_dates?: Json | null
          is_featured?: boolean | null
          requirements?: string | null
          scholarship_type?: string | null
          short_description?: string | null
          status?: string | null
          study_level?: string | null
          title: string
          university_logo?: string | null
          updated_at?: string
          vacancies_by_country?: Json | null
          value?: string | null
          views_count?: number | null
        }
        Update: {
          area?: string | null
          benefits?: Json | null
          category?: Database["public"]["Enums"]["publication_category"]
          country?: string | null
          country_info?: Json | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string
          external_link?: string | null
          id?: string
          image_url?: string | null
          important_dates?: Json | null
          is_featured?: boolean | null
          requirements?: string | null
          scholarship_type?: string | null
          short_description?: string | null
          status?: string | null
          study_level?: string | null
          title?: string
          university_logo?: string | null
          updated_at?: string
          vacancies_by_country?: Json | null
          value?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      scholarship_requests: {
        Row: {
          city: string
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          payment_status: string | null
          phone: string
          publication_id: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          city: string
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          payment_status?: string | null
          phone: string
          publication_id: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          payment_status?: string | null
          phone?: string
          publication_id?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_requests_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          publication_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          publication_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          publication_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_messages: { Args: never; Returns: undefined }
      cleanup_old_requests: { Args: never; Returns: undefined }
      get_registered_users_count: { Args: never; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      publication_category: "scholarship" | "job" | "course"
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
    Enums: {
      app_role: ["admin", "user"],
      publication_category: ["scholarship", "job", "course"],
    },
  },
} as const
