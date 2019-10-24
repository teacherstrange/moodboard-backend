import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Field, ObjectType} from 'type-graphql';

@ObjectType()
@Entity('user')
export class User {

  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column('varchar', { length: 500 })
  firstName: string;

  @Field()
  @Column('varchar', { length: 500 })
  lastName: string;

  @Field()
  @Column('varchar', { length: 500, unique: true })
  email: string;

  @Field()
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Field()
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
