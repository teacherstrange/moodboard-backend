import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType} from 'type-graphql';
import { createHmac } from 'crypto';

@ObjectType()
@Entity('user')
export class User {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 500 })
  firstName?: string;

  @Field()
  @Column('varchar', { length: 500 })
  lastName?: string;

  @Field()
  @Column('varchar', { length: 500, unique: true })
  email: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @Column({length: 255, nullable: true})
  salt: string|undefined;

  @Field()
  @Column({ length: 100, nullable: true })
  password: string|undefined;

  @BeforeInsert()
  hashPassword() {
    this.salt = Math.round(new Date().valueOf() * Math.random()) + '';
    this.password = createHmac('sha1', this.salt)
      .update(this.password)
      .digest('hex');
  }
}
