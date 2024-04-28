import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  UserID: string;
  @Column()
  FullName: string;
  @Column()
  Role: string;
  @Column()
  PasswordHash: string;
  @Column()
  Email: string;
  @Column()
  LastPasswordChangeDate: Date;
  @Column()
  LastLoginDate: Date;
  @Column()
  Status: string;
  @Column()
  Grade: string;
  @Column()
  Gender: string;
}
