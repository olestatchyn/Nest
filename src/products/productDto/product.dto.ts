import { IsNotEmpty, IsNumber, IsString, IsUUID, MinLength } from 'class-validator';

class BaseProductDto {
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

export class ProductEntityDto extends BaseProductDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}

export class CreateProductDto extends BaseProductDto {}