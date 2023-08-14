import { IsEmpty, IsNotEmpty, IsNumber, IsString, IsUUID, MinLength } from "class-validator";

export class CreateProductDto{
    @IsEmpty()
    id: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
    @IsNumber()
    @IsNotEmpty()
    weight: number;
    @IsNumber()
    @IsNotEmpty() 
    price: number;
}

export class ProductDto{
    @IsUUID()
    @IsNotEmpty()
    id: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
    @IsNumber()
    @IsNotEmpty()
    weight: number;
    @IsNumber()
    @IsNotEmpty() 
    price: number;
}