import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './productDto/product.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ProductRepository extends Repository<Product>{
    constructor(private dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }
    async getPaginatedItems(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [items, totalItems] = await this.findAndCount({
          skip,
          take: limit,
        });
        const totalPages = Math.ceil(totalItems / limit);
        return {
            items,
            currentPage: page,
            totalPages,
        };
    }
    async createProduct(productData: CreateProductDto): Promise<Product> {
        const newProduct = new Product();

        newProduct.id = uuidv4();
        newProduct.name = productData.name;
        newProduct.weight = productData.weight;
        newProduct.price = productData.price;

        return newProduct;
    }
}