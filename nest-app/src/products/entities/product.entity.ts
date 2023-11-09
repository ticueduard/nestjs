import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Images} from "../../images/entities/image.entity"
import {ProductReview} from "../../product-review/entities/product-review.entity";
import {ProductAttribute} from "../../product_attributes/entities/product_attribute.entity";
import {QA} from "../../qa/entities/qa.entity";

@Entity('products')
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 255})
    name: string;

    @Column("text")
    description: string;

    @Column("decimal", {precision: 10, scale: 2})
    price: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @OneToMany(() => QA, (qa) => qa.product)
    qa: QA;

    @OneToMany(() => Images, (image) => image.product, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    images: Images[];

    @OneToMany(() => ProductReview, (productReview) => productReview.product)
    productReview: ProductReview;

    @OneToMany(() => ProductAttribute, (attribute) => attribute.product)
    attribute: ProductAttribute;


}
