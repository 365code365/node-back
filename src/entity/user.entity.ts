import {Column, Entity, PrimaryColumn} from "typeorm";


@Entity('user')
export class UserEntity {

    @PrimaryColumn()
    id: string

    @Column()
    email: string


    @Column()
    username: string

}
