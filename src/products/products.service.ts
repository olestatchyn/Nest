import { Injectable, NotFoundException} from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { ProductRepository } from './products.repository';
import { ProductEntityDto } from './productDto/product.dto';

@Injectable()
export class ProductsService {
    constructor(private productRepository: ProductRepository) {}

    async getPaginatedItems(page: number, limit: number) {
        return this.productRepository.getPaginatedItems(page, limit);
    }
    async getProducts(): Promise<ProductEntityDto[]> {
        return this.productRepository.find();
    }
    async getProductById(id: string): Promise<ProductEntityDto> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
          }
        return product;
    }
    async updateProduct(id: string, updatedProduct: Partial<ProductEntityDto>): Promise<Product> {
        const existingProduct = await this.productRepository.findOneBy({ id });
        const updated = { ...existingProduct, ...updatedProduct };
        return this.productRepository.save(updated);
    }
    async removeProduct(id: string): Promise<void> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
    }
}