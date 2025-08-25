import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../core/models/product.entity';
import { sampleProducts } from './product.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async seedProducts(): Promise<void> {
    // Check if products already exist
    const existingProducts = await this.productRepository.count();
    if (existingProducts > 0) {
      console.log('Products already seeded, skipping...');
      return;
    }

    // Create products
    for (const productData of sampleProducts) {
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);
    }

    console.log(`Seeded ${sampleProducts.length} products successfully!`);
  }

  async clearProducts(): Promise<void> {
    await this.productRepository.clear();
    console.log('All products cleared!');
  }
}
