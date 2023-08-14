import { Body, Controller, Get, Param, Post, Patch, Delete, Query} from "@nestjs/common";
// import { Product } from "src/entities/product.entity";
import { ProductRepository } from "./products.repository";
import {CreateProductDto, ProductDto } from "./productDto/product.dto";

@Controller('products')
export class ProductsController {
    constructor(private productRepository: ProductRepository) {}

    @Get()
    async getPaginatedItems(@Query('page') page: number = 1, @Query('limit') limit: number = 10,){
        return this.productRepository.getPaginatedItems(page, limit);
    }
    @Get()
    async getProducts(): Promise<ProductDto[]> {
        return this.productRepository.find();
    }
    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<ProductDto> {
        return this.productRepository.findOneBy({ id });
    }
    @Post()
    async createProduct(@Body() productData: CreateProductDto): Promise<ProductDto> {
        const product = await this.productRepository.createProduct(productData);
        console.log(product);
        return this.productRepository.save(product);
    }
    // @Post()
    // async create(@Body() productData: Partial<Product>): Promise<Product> {
    //     return this.productRepository.createProduct(productData);
    // }
    @Patch(':id')
    async updateProduct(@Param('id') id: string, @Body() product: Partial<ProductDto>): Promise<ProductDto> {
        await this.productRepository.update(id, product);
        return this.productRepository.findOneBy({ id });
    }
    @Delete(':id')
        async removeProduct(@Param('id') id: string): Promise<void> {
        await this.productRepository.delete(id);
    }
}