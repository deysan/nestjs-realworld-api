import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  // Never loaded by default: a query has to ask for the hash explicitly.
  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
