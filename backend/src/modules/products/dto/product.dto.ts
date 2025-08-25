import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsObject, Min, IsUrl } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Product category' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Product image URL', required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ description: 'Product specifications', required: false })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;

  @ApiProperty({ description: 'Stock quantity' })
  @IsNumber()
  @Min(0)
  stockQuantity: number;

  @ApiProperty({ description: 'Product SKU' })
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Product weight in grams', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiProperty({ description: 'Product dimensions', required: false })
  @IsOptional()
  @IsObject()
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Product name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Product price', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ description: 'Product category', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Product image URL', required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ description: 'Product specifications', required: false })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;

  @ApiProperty({ description: 'Stock quantity', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stockQuantity?: number;

  @ApiProperty({ description: 'Product weight in grams', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiProperty({ description: 'Product dimensions', required: false })
  @IsOptional()
  @IsObject()
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export class ProductResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  specifications: Record<string, any>;

  @ApiProperty()
  stockQuantity: number;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  dimensions: {
    length: number;
    width: number;
    height: number;
  };

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
