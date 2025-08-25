import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Product } from '../models/product.entity';
import { CartItem } from '../models/cart-item.entity';
import { Order } from '../models/order.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const isDevelopment = this.configService.get<string>('NODE_ENV') === 'development';
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    
    // Debug logging
    console.log('🔍 Database Config Debug:');
    console.log('- NODE_ENV:', this.configService.get<string>('NODE_ENV'));
    console.log('- DATABASE_URL exists:', !!databaseUrl);
    console.log('- DATABASE_URL starts with:', databaseUrl ? databaseUrl.substring(0, 20) + '...' : 'NOT SET');
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [Product, CartItem, Order],
      synchronize: isDevelopment, // Only auto-sync in development
      logging: isDevelopment,
      ssl: {
        rejectUnauthorized: false, // Required for Supabase
      },
      extra: {
        max: 20, // Connection pool size
        connectionTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
      },
      // Supabase-specific optimizations
      cache: {
        duration: 30000, // 30 seconds cache
      },
    };
  }
}
