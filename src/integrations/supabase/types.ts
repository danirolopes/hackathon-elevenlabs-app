export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      missing_ingredients: {
        Row: {
          created_at: string | null
          id: string
          ingredient_name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ingredient_name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ingredient_name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pantry_ingredients: {
        Row: {
          created_at: string
          id: string
          ingredient_name: string
          quantity: number
          unit: Database["public"]["Enums"]["unit_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_name: string
          quantity?: number
          unit?: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_name?: string
          quantity?: number
          unit?: Database["public"]["Enums"]["unit_type"]
          updated_at?: string
        }
        Relationships: []
      }
      recipe_steps: {
        Row: {
          actual_end_time: string | null
          actual_start_time: string | null
          created_at: string | null
          description: string
          id: string
          predicted_end_time: string | null
          predicted_start_time: string | null
          recipe_id: string
          status: Database["public"]["Enums"]["step_status"] | null
          step_number: number
          updated_at: string | null
        }
        Insert: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          created_at?: string | null
          description: string
          id?: string
          predicted_end_time?: string | null
          predicted_start_time?: string | null
          recipe_id: string
          status?: Database["public"]["Enums"]["step_status"] | null
          step_number: number
          updated_at?: string | null
        }
        Update: {
          actual_end_time?: string | null
          actual_start_time?: string | null
          created_at?: string | null
          description?: string
          id?: string
          predicted_end_time?: string | null
          predicted_start_time?: string | null
          recipe_id?: string
          status?: Database["public"]["Enums"]["step_status"] | null
          step_number?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      recipes: {
        Row: {
          all_reviews: string | null
          calories: number | null
          carbohydrates_pdv: number | null
          contributor_id: number | null
          description: string | null
          id: number
          ingredients: string[] | null
          minutes: number | null
          n_ingredients: number | null
          n_steps: number | null
          name: string
          protein_pdv: number | null
          rating_count: number | null
          rating_mean: number | null
          saturated_fat_pdv: number | null
          sodium_pdv: number | null
          steps: string | null
          submitted: string | null
          sugar_pdv: number | null
          tags: string[] | null
          tags_embedding: string | null
          total_fat_pdv: number | null
        }
        Insert: {
          all_reviews?: string | null
          calories?: number | null
          carbohydrates_pdv?: number | null
          contributor_id?: number | null
          description?: string | null
          id: number
          ingredients?: string[] | null
          minutes?: number | null
          n_ingredients?: number | null
          n_steps?: number | null
          name: string
          protein_pdv?: number | null
          rating_count?: number | null
          rating_mean?: number | null
          saturated_fat_pdv?: number | null
          sodium_pdv?: number | null
          steps?: string | null
          submitted?: string | null
          sugar_pdv?: number | null
          tags?: string[] | null
          tags_embedding?: string | null
          total_fat_pdv?: number | null
        }
        Update: {
          all_reviews?: string | null
          calories?: number | null
          carbohydrates_pdv?: number | null
          contributor_id?: number | null
          description?: string | null
          id?: number
          ingredients?: string[] | null
          minutes?: number | null
          n_ingredients?: number | null
          n_steps?: number | null
          name?: string
          protein_pdv?: number | null
          rating_count?: number | null
          rating_mean?: number | null
          saturated_fat_pdv?: number | null
          sodium_pdv?: number | null
          steps?: string | null
          submitted?: string | null
          sugar_pdv?: number | null
          tags?: string[] | null
          tags_embedding?: string | null
          total_fat_pdv?: number | null
        }
        Relationships: []
      }
      user_requests: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          recipe_id: string
          request_message: string
          request_type: string
          response: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          step_id: string | null
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          recipe_id: string
          request_message: string
          request_type: string
          response?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          step_id?: string | null
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          recipe_id?: string
          request_message?: string
          request_type?: string
          response?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          step_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_requests_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "recipe_steps"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      array_intersect: {
        Args: {
          a: unknown
          b: unknown
        }
        Returns: unknown
      }
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      search_recipes: {
        Args: {
          query_embedding: string
          user_ingredients: string[]
          vibe_limit?: number
        }
        Returns: {
          id: number
          name: string
          minutes: number
          contributor_id: number
          submitted: string
          tags: string[]
          n_steps: number
          steps: string
          description: string
          ingredients: string[]
          n_ingredients: number
          rating_mean: number
          rating_count: number
          all_reviews: string
          calories: number
          total_fat_pdv: number
          sugar_pdv: number
          sodium_pdv: number
          protein_pdv: number
          saturated_fat_pdv: number
          carbohydrates_pdv: number
          tags_embedding: string
          similarity: number
          matches: number
        }[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      request_status: "pending" | "completed" | "cancelled"
      step_status:
        | "unable_to_start"
        | "ready_to_start"
        | "in_progress"
        | "ready_to_finish"
        | "finished"
      unit_type:
        | "grams"
        | "kilograms"
        | "milliliters"
        | "liters"
        | "units"
        | "teaspoons"
        | "tablespoons"
        | "cups"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
