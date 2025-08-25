import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { Order } from '../../core/models/order.entity';
import { CartModule } from '../cart/cart.module';
import { ProductsModule } from '../products/products.module';
import { SessionService } from '../../core/services/session.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CartModule, ProductsModule],
  controllers: [CheckoutController],
  providers: [CheckoutService, SessionService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
