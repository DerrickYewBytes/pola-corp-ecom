import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CartService } from './cart.service';
import { SessionService } from '../../core/services/session.service';
import {
  AddToCartDto,
  CartResponseDto,
  UpdateCartItemDto,
} from './dto/cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly sessionService: SessionService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - insufficient stock' })
  async addToCart(
    @Body() addToCartDto: AddToCartDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const sessionId = this.sessionService.getSessionId(req);
    this.sessionService.setSessionCookie(res, sessionId);
    return this.cartService.addToCart(addToCartDto, sessionId);
  }

  @Get()
  @ApiOperation({ summary: 'Get cart contents' })
  @ApiResponse({
    status: 200,
    description: 'Cart contents retrieved',
    type: CartResponseDto,
  })
  async getCart(@Req() req: Request): Promise<CartResponseDto> {
    const sessionId = this.sessionService.getSessionId(req);
    return this.cartService.getCart(sessionId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @ApiResponse({ status: 400, description: 'Bad request - insufficient stock' })
  async updateCartItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req: Request
  ) {
    const sessionId = this.sessionService.getSessionId(req);
    return this.cartService.updateCartItem(id, updateCartItemDto, sessionId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'id', description: 'Cart item ID' })
  @ApiResponse({
    status: 200,
    description: 'Item removed from cart successfully',
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async removeFromCart(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request
  ) {
    const sessionId = this.sessionService.getSessionId(req);
    return this.cartService.removeFromCart(id, sessionId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear entire cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully' })
  async clearCart(@Req() req: Request, @Res() res: Response) {
    const sessionId = this.sessionService.getSessionId(req);
    this.sessionService.clearSessionCookie(res);
    return this.cartService.clearCart(sessionId);
  }
}
