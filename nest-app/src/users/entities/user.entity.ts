import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "../../profile/entities/profile.entity";
import {ProductReview} from "../../product-review/entities/product-review.entity";
import {QA} from "../../qa/entities/qa.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

    @Column()
    email:string;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;

    @OneToMany(() => ProductReview, (productReview) => productReview.user)
    productReview: ProductReview;

    @OneToMany(() => QA, (qa) => qa.uQuestion)
    uQuestions: QA;

    @OneToMany(() => QA, (qa) => qa.uAnswer)
    uAnswers: QA;

}
