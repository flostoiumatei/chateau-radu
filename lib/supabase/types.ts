// ==============================
// SUPABASE DATABASE TYPES
// Generated manually — replace with generated types if using Supabase CLI
// ==============================

export interface Database {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          source: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
          source?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          source?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
          status: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
          status?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
          status?: string;
        };
      };
      tasting_reservations: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          preferred_date: string | null;
          guests: number;
          message: string | null;
          created_at: string;
          status: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          preferred_date?: string | null;
          guests?: number;
          message?: string | null;
          created_at?: string;
          status?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          preferred_date?: string | null;
          guests?: number;
          message?: string | null;
          created_at?: string;
          status?: string;
        };
      };
    };
  };
}
