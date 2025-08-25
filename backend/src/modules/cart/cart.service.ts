import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../core/models/cart-item.entity';
import { ProductsService } from '../products/products.service';
import { AddToCartDto, UpdateCartItemDto, CartResponseDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
  ) {}

  async addToCart(addToCartDto: AddToCartDto, sessionId: string): Promise<CartItem> {
    const { productId, quantity } = addToCartDto;

    // Check if product exists and has sufficient stock
    const product = await this.productsService.findOne(productId);
    if (product.stockQuantity < quantity) {
      throw new BadRequestException(`Insufficient stock. Available: ${product.stockQuantity}`);
    }

    // Check if item already exists in cart
    const existingItem = await this.cartItemRepository.findOne({
      where: { productId, sessionId },
    });

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += quantity;
      return this.cartItemRepository.save(existingItem);
    } else {
      // Create new cart item
      const cartItem = this.cartItemRepository.create({
        productId,
        quantity,
        sessionId,
      });
      return this.cartItemRepository.save(cartItem);
    }
  }

  async getCart(sessionId: string): Promise<CartResponseDto> {
    const cartItems = await this.cartItemRepository.find({
      where: { sessionId },
      relations: ['product'],
    });

    // Fetch product details for each cart item
    const itemsWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);
        return {
          ...item,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            stockQuantity: product.stockQuantity,
          },
        };
      }),
    );

    const total = itemsWithProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const itemCount = itemsWithProducts.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: itemsWithProducts,
      total,
      itemCount,
    };
  }

  async updateCartItem(id: number, updateCartItemDto: UpdateCartItemDto, sessionId: string): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id, sessionId },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    // Check stock availability
    const product = await this.productsService.findOne(cartItem.productId);
    if (product.stockQuantity < updateCartItemDto.quantity) {
      throw new BadRequestException(`Insufficient stock. Available: ${product.stockQuantity}`);
    }

    cartItem.quantity = updateCartItemDto.quantity;
    return this.cartItemRepository.save(cartItem);
  }

  async removeFromCart(id: number, sessionId: string): Promise<void> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id, sessionId },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    await this.cartItemRepository.remove(cartItem);
  }

  async clearCart(sessionId: string): Promise<void> {
    await this.cartItemRepository.delete({ sessionId });
  }

  async getCartItemCount(sessionId: string): Promise<number> {
    const result = await this.cartItemRepository
      .createQueryBuilder('cartItem')
      .select('SUM(cartItem.quantity)', 'count')
      .where('cartItem.sessionId = :sessionId', { sessionId })
      .getRawOne();

    return parseInt(result?.count || '0', 10);
  }
}
