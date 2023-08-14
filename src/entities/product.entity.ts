import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: string;

    @Column() 
    name: string;

    @Column() 
    weight: number;
    
    @Column() 
    price: number;
}