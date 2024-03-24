import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('token')
export class TokenEntity {

    @PrimaryColumn()
    ID: string;
    @Column()
    token: string;
    @Column()
    createTime: Date;
    @Column()
    updateTime: Date;
    @Column()
    status: number;
    @Column()
    UserId: string;
}
