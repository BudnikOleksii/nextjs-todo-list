export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          completed: boolean;
          created_at: string;
          deadline: string;
          description: string;
          id: number;
          priority: Database['public']['Enums']['priority'];
          title: string;
          userId: string;
        };
        Insert: {
          completed?: boolean;
          created_at?: string;
          deadline?: string;
          description: string;
          id?: number;
          priority?: Database['public']['Enums']['priority'];
          title: string;
          userId: string;
        };
        Update: {
          completed?: boolean;
          created_at?: string;
          deadline?: string;
          description?: string;
          id?: number;
          priority?: Database['public']['Enums']['priority'];
          title?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      priority: 'low' | 'medium' | 'high';
      status: 'todo' | 'inProgress' | 'done';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
