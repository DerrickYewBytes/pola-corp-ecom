import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from '../../core/models/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationQueryDto, PaginatedResponseDto } from './dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto = { page: 1, limit: 20 }): Promise<PaginatedResponseDto<Product>> {
    const { page = 1, limit = 20 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [items, total] = await this.productRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategory(category: string, paginationQuery: PaginationQueryDto = { page: 1, limit: 20 }): Promise<PaginatedResponseDto<Product>> {
    const { page = 1, limit = 20 } = paginationQuery;
    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository.createQueryBuilder('product');
    
    const [items, total] = await queryBuilder
      .where('LOWER(product.category) = LOWER(:category)', { category })
      .orderBy('product.name', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async search(query: string, paginationQuery: PaginationQueryDto = { page: 1, limit: 20 }): Promise<PaginatedResponseDto<Product>> {
    const { page = 1, limit = 20 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [items, total] = await this.productRepository.findAndCount({
      where: [
        { name: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
        { category: Like(`%${query}%`) },
      ],
      order: { name: 'ASC' },
      skip,
      take: limit,
    });

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async getCategories(): Promise<string[]> {
    const categories = await this.productRepository
      .createQueryBuilder('product')
      .select('DISTINCT product.category', 'category')
      .getRawMany();
    
    return categories.map(cat => cat.category);
  }

  async checkStock(id: number, quantity: number): Promise<boolean> {
    const product = await this.findOne(id);
    return product.stockQuantity >= quantity;
  }

  async updateStock(id: number, quantity: number): Promise<void> {
    const product = await this.findOne(id);
    product.stockQuantity -= quantity;
    await this.productRepository.save(product);
  }
}
