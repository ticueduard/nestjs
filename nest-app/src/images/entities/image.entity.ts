import {Column,ManyToOne,JoinColumn ,Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Products} from '../../products/entities/product.entity';


@Entity('images')
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    imagePath: string;

    @ManyToOne(() => Products, (product) => product.images,{ onDelete: "CASCADE" })
    @JoinColumn({ name: 'productId' })
    product: Products;

}
