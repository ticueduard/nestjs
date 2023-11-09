import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Products} from "../../products/entities/product.entity";

@Entity('product_attibutes')
export class ProductAttribute {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:number;

    @Column()
    attrName:string;

    @ManyToOne(() => Products, (product) => product.attribute,{ onDelete: "CASCADE" })
    @JoinColumn({ name: 'productId' })
    product: Products;
}
