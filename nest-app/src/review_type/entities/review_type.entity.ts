import {Column,  Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductReview} from "../../product-review/entities/product-review.entity";

@Entity('review_type')
export class ReviewType {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(() => ProductReview, (productReview) => productReview.reviewType)
    productReview: ProductReview;


}
