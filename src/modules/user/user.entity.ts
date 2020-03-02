import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from '../role/role.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { unique: true })
  name: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  created: string;

  @ApiProperty()
  @UpdateDateColumn()
  update: string;

  @ApiProperty()
  @ManyToMany(
    type => Role,
    role => role.users,
  )

  // 会创建一个关系表
  @JoinTable()
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparepassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
