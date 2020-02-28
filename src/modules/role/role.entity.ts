import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserRole } from 'src/core/decorators/enums/user-role.enum';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, unique: true })
  name: UserRole;

  @Column()
  alias: string;

  // 角色和用戶多对多的关系
  @ManyToMany(
    type => User,
    user => user.roles,
  )
  users: User[];
}
