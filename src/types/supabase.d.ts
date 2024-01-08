export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      camp: {
        Row: {
          address: string
          company_id: string
          content: string | null
          created_at: string
          id: string
          lat: string
          long: string
          max_people: number
          name: string | null
          title: string | null
        }
        Insert: {
          address: string
          company_id: string
          content?: string | null
          created_at?: string
          id?: string
          lat: string
          long: string
          max_people: number
          name?: string | null
          title?: string | null
        }
        Update: {
          address?: string
          company_id?: string
          content?: string | null
          created_at?: string
          id?: string
          lat?: string
          long?: string
          max_people?: number
          name?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "camp_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_user"
            referencedColumns: ["id"]
          }
        ]
      }
      camp_pic: {
        Row: {
          camp_id: string
          id: string
          photo_url: string
        }
        Insert: {
          camp_id: string
          id?: string
          photo_url: string
        }
        Update: {
          camp_id?: string
          id?: string
          photo_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "camp_pic_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      company_user: {
        Row: {
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          email?: string
          id?: string
          name?: string
          password?: string
        }
        Relationships: []
      }
      facility: {
        Row: {
          camp_id: string
          id: string
          option: string
        }
        Insert: {
          camp_id: string
          id?: string
          option: string
        }
        Update: {
          camp_id?: string
          id?: string
          option?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          }
        ]
      }
      like: {
        Row: {
          camp_id: string | null
          created_at: string
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          camp_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          camp_id?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      post: {
        Row: {
          camp_id: string | null
          content: string
          created_at: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          camp_id?: string | null
          content: string
          created_at?: string
          id?: string
          title: string
          user_id: string
        }
        Update: {
          camp_id?: string | null
          content?: string
          created_at?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      post_pic: {
        Row: {
          id: string
          photo_url: string | null
          post_id: string
        }
        Insert: {
          id?: string
          photo_url?: string | null
          post_id: string
        }
        Update: {
          id?: string
          photo_url?: string | null
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_pic_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          }
        ]
      }
      reservation: {
        Row: {
          camp_id: string | null
          check_in_date: string | null
          check_out_date: string | null
          create_at: string
          fee: number | null
          id: string
          people: number | null
          user_id: string | null
        }
        Insert: {
          camp_id?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          create_at?: string
          fee?: number | null
          id?: string
          people?: number | null
          user_id?: string | null
        }
        Update: {
          camp_id?: string | null
          check_in_date?: string | null
          check_out_date?: string | null
          create_at?: string
          fee?: number | null
          id?: string
          people?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservation_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservation_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      review: {
        Row: {
          camp_id: string | null
          content: string
          created_at: string
          id: string
          rating: number
          title: string
          user_id: string | null
        }
        Insert: {
          camp_id?: string | null
          content: string
          created_at?: string
          id?: string
          rating: number
          title: string
          user_id?: string | null
        }
        Update: {
          camp_id?: string | null
          content?: string
          created_at?: string
          id?: string
          rating?: number
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_camp_id_fkey"
            columns: ["camp_id"]
            isOneToOne: false
            referencedRelation: "camp"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          email: string
          id: string
          nickname: string
          password: string
          profile_url: string | null
        }
        Insert: {
          email: string
          id?: string
          nickname: string
          password: string
          profile_url?: string | null
        }
        Update: {
          email?: string
          id?: string
          nickname?: string
          password?: string
          profile_url?: string | null
        }
        Relationships: []
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
