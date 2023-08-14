// import { Module } from "@nestjs/common";
// import { DatabaseModule } from "src/database/database.module";
// import { ProductsService } from "./products.service";
// import { ProductsController } from "./products.controller";


// @Module({
//     imports: [DatabaseModule],
//     controllers: [ProductsController],
//     providers: [ProductsService],
// })
// export class ProductModule {}
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { Product } from "src/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "./products.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductRepository])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductRepository],
})
export class ProductModule {}