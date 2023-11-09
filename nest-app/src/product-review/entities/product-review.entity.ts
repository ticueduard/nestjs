import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {Products} from "../../products/entities/product.entity";
import {User} from "../../users/entities/user.entity";
import {ReviewType} from "../../review_type/entities/review_type.entity";
import {IsNotEmpty, Max, Min} from "class-validator";

@Entity('product_Review')
export class ProductReview {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:number;

    @Column()
    idReviewType:number;

    @Column()
    review:number;

    @Column()
    userId:number;

    @ManyToOne(() => Products, (product) => product.productReview)
    @JoinColumn({ name: 'productId' })
    product: Products;

    @ManyToOne(() => User, (user) => user.productReview)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => ReviewType, (reviewType) => reviewType.productReview)
    @JoinColumn({ name: 'idReviewType' })
    reviewType: ReviewType;

}
