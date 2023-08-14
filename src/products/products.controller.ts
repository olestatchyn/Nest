import { Body, Controller, Get, Param, Post, Patch, Delete, Query} from '@nestjs/common';
import { ProductRepository } from './products.repository';
import {CreateProductDto, ProductEntityDto } from './productDto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productRepository: ProductRepository) {}

    @Get()
    async getPaginatedItems(@Query('page') page: number = 1, @Query('limit') limit: number = 10,){
        return this.productRepository.getPaginatedItems(page, limit);
    }
    @Get()
    async getProducts(): Promise<ProductEntityDto[]> {
        return this.productRepository.find();
    }
    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<ProductEntityDto> {
        return this.productRepository.findOneBy({ id });
    }
    @Post()
    async createProduct(@Body() productData: CreateProductDto): Promise<ProductEntityDto> {
        const product = await this.productRepository.createProduct(productData);
        return this.productRepository.save(product);
    }
    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Partial<ProductEntityDto>): Promise<ProductEntityDto> {
        await this.productRepository.update(id, product);
        return this.productRepository.findOneBy({ id });
    }
    @Delete(':id')
        async removeProduct(@Param('id') id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}