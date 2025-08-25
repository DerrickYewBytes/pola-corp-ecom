import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { CheckoutDto, OrderResponseDto } from './dto/checkout.dto';
import { Request } from 'express';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @ApiOperation({ summary: 'Process checkout and create order' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - cart empty or insufficient stock',
  })
  @ApiHeader({
    name: 'X-Session-ID',
    description: 'Session ID for anonymous users',
  })
  async processCheckout(
    @Body() checkoutDto: CheckoutDto,
    @Req() req: Request
  ): Promise<OrderResponseDto> {
    const sessionId =
      (req.headers['x-session-id'] as string) || 'default-session';
    return this.checkoutService.processCheckout(checkoutDto, sessionId);
  }

  @Get('orders/:orderNumber')
  @ApiOperation({ summary: 'Get order by order number' })
  @ApiParam({ name: 'orderNumber', description: 'Order number' })
  @ApiResponse({
    status: 200,
    description: 'Order found',
    type: OrderResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrder(
    @Param('orderNumber') orderNumber: string
  ): Promise<OrderResponseDto> {
    return this.checkoutService.getOrder(orderNumber);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get orders for current session' })
  @ApiResponse({
    status: 200,
    description: 'Orders retrieved',
    type: [OrderResponseDto],
  })
  @ApiHeader({
    name: 'X-Session-ID',
    description: 'Session ID for anonymous users',
  })
  async getOrders(@Req() req: Request): Promise<OrderResponseDto[]> {
    const sessionId =
      (req.headers['x-session-id'] as string) || 'default-session';
    return this.checkoutService.getOrdersBySession(sessionId);
  }
}
