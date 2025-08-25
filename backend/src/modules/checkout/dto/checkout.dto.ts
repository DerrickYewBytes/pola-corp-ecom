import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CheckoutDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'Customer email' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({ description: 'Shipping address' })
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @ApiProperty({ description: 'Session ID for anonymous users', required: false })
  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class OrderResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  orderNumber: string;

  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerEmail: string;

  @ApiProperty()
  shippingAddress: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    total: number;
  }>;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
