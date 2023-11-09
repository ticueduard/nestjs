import {Column, Entity, JoinColumn,  OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";

@Entity('profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId:number;

    @Column()
    phone:number;

    @Column()
    country:string;

    @Column()
    city:string;

    @Column()
    adressLine1:string;

    @Column()
    adressLine2:string

    @OneToOne(type => User, user => user.profile, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;


}
