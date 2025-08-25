import { Controller, Get, Post, Body, Put, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto, CartResponseDto } from './dto/cart.dto';
import { Request } from 'express';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - insufficient stock' })
  @ApiHeader({ name: 'X-Session-ID', description: 'Session ID for anonymous users' })
  async addToCart(@Body() addToCartDto: AddToCartDto, @Req() req: Request) {
    const sessionId = req.headers['x-session-id'] as string || 'default-session';
    return this.cartService.addToCart(addToCartDto, sessionId);
  }

  @Get()
  @ApiOperation({ summary: 'Get cart contents' })
  @ApiResponse({ status: 200, description: 'Cart contents retrieved', type: CartResponseDto })
  @ApiHeader({ name: 'X-Session-ID', description: 'Session ID for anonymous users' })
  async getCart(@Req() req: Request): Promise<CartResponseDto> {
    const sessionId = req.headers['x-session-id'] as string || 'default-session';
    return this.cartService.getCart(sessionId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @ApiResponse({ status: 400, description: 'Bad request - insufficient stock' })
  @ApiHeader({ name: 'X-Session-ID', description: 'Session ID for anonymous users' })
  async updateCartItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req: Request,
  ) {
    const sessionId = req.headers['x-session-id'] as string || 'default-session';
    return this.cartService.updateCartItem(id, updateCartItemDto, sessionId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @ApiHeader({ name: 'X-Session-ID', description: 'Session ID for anonymous users' })
  async removeFromCart(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const sessionId = req.headers['x-session-id'] as string || 'default-session';
    return this.cartService.removeFromCart(id, sessionId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear entire cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  @ApiHeader({ name: 'X-Session-ID', description: 'Session ID for anonymous users' })
  async clearCart(@Req() req: Request) {
    const sessionId = req.headers['x-session-id'] as string || 'default-session';
    return this.cartService.clearCart(sessionId);
  }
}
