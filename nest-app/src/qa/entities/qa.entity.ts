import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Products} from "../../products/entities/product.entity";

@Entity('qa')
export class QA {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:string;


    @Column()
    question:string;

    @Column({ nullable: true })
    answer: string;

    @Column()
    userQuestion:string;


    @Column({ nullable: true })
    userAnswer: string;

    @ManyToOne(() => Products, (product) => product.qa,{ onDelete: "CASCADE" })
    @JoinColumn({ name: 'productId' })
    product: Products;

    @ManyToOne(() => User, (user) => user.uQuestions)
    @JoinColumn({ name: 'userQuestion' })
    uQuestion: User;

    @ManyToOne(() => User, (user) => user.uAnswers)
    @JoinColumn({ name: 'userAnswer' })
    uAnswer: User;
}
