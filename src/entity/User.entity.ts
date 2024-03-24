import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  UserlD: string;
  @Column()
  FullName: string;
  @Column()
  Role: string;
  @Column()
  PasswordHash: string;
  @Column()
  LastPasswordChangeDate: Date;
  @Column()
  LastLoginDate: Date;
  @Column()
  Status: string;
}
