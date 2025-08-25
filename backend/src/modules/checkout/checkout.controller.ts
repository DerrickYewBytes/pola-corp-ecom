import { Controller, Post, Body, Get, Param, Req, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiHeader,
} from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { SessionService } from '../../core/services/session.service';
import { CheckoutDto, OrderResponseDto } from './dto/checkout.dto';
import { Request, Response } from 'express';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly sessionService: SessionService
  ) {}

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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<OrderResponseDto> {
    console.log('Checkout controller: Received checkout request:', checkoutDto);
    const sessionId = this.sessionService.getSessionId(req);
    console.log('Checkout controller: Session ID:', sessionId);
    const result = await this.checkoutService.processCheckout(checkoutDto, sessionId);
    console.log('Checkout controller: Service returned result:', result);
    this.sessionService.clearSessionCookie(res);
    console.log('Checkout controller: Returning result to client');
    return result;
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
    const sessionId = this.sessionService.getSessionId(req);
    return this.checkoutService.getOrdersBySession(sessionId);
  }
}
