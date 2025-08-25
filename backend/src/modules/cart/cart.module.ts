import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from '../../core/models/cart-item.entity';
import { ProductsModule } from '../products/products.module';
import { SessionService } from '../../core/services/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), ProductsModule],
  controllers: [CartController],
  providers: [CartService, SessionService],
  exports: [CartService],
})
export class CartModule {}
