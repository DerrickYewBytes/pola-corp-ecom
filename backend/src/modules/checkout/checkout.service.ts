import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../core/models/order.entity';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { CheckoutDto, OrderResponseDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
    private readonly productsService: ProductsService
  ) {}

  async processCheckout(
    checkoutDto: CheckoutDto,
    sessionId: string
  ): Promise<OrderResponseDto> {
    // Get current cart
    const cart = await this.cartService.getCart(sessionId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Validate stock for all items
    for (const item of cart.items) {
      const hasStock = await this.productsService.checkStock(
        item.productId,
        item.quantity
      );
      if (!hasStock) {
        throw new BadRequestException(
          `Insufficient stock for product: ${item.product.name}`
        );
      }
    }

    // Generate order number
    const orderNumber = this.generateOrderNumber();

    // Create order items array
    const orderItems = cart.items.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    }));

    // Create order
    const order = this.orderRepository.create({
      orderNumber,
      customerName: checkoutDto.customerName,
      customerEmail: checkoutDto.customerEmail,
      shippingAddress: checkoutDto.shippingAddress,
      total: cart.total,
      sessionId,
      items: orderItems,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Update stock for all products
    for (const item of cart.items) {
      await this.productsService.updateStock(item.productId, item.quantity);
    }

    // Clear the cart
    await this.cartService.clearCart(sessionId);

    return savedOrder;
  }

  async getOrder(orderNumber: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
    });

    if (!order) {
      throw new NotFoundException(`Order with number ${orderNumber} not found`);
    }

    return order;
  }

  async getOrdersBySession(sessionId: string): Promise<OrderResponseDto[]> {
    return this.orderRepository.find({
      where: { sessionId },
      order: { createdAt: 'DESC' },
    });
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `POLA-${timestamp}-${random}`;
  }
}
