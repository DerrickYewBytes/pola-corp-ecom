import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseConfig {
  private supabaseClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing. Please check your environment variables.');
    }

    // Create Supabase client with service role key for admin operations
    this.supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  getClient(): SupabaseClient {
    return this.supabaseClient;
  }

  getUrl(): string {
    return this.configService.get<string>('SUPABASE_URL');
  }

  getAnonKey(): string {
    return this.configService.get<string>('SUPABASE_ANON_KEY');
  }

  getServiceKey(): string {
    return this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
  }
}
