import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min, IsInt } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  @IsInt()
  productId: number;

  @ApiProperty({ description: 'Quantity to add' })
  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Session ID for anonymous users', required: false })
  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ description: 'New quantity' })
  @IsNumber()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CartItemResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    stockQuantity: number;
  };
}

export class CartResponseDto {
  @ApiProperty({ type: [CartItemResponseDto] })
  items: CartItemResponseDto[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  itemCount: number;
}
