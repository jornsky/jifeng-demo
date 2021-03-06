import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
  ) {}

  async store(data: UserDto) {
    const { name } = data;
    const user = await this.userRespository.findOne({ name });

    if (user) {
      throw new BadRequestException('用户已存在');
    }

    const entity = await this.userRespository.create(data);
    await this.userRespository.save(entity);
    return entity;
  }

  async showOne(id: string) {
    const entity = await this.userRespository.findOne(id);

    if (!entity) {
      throw new NotFoundException('没有找到用户');
    }

    return entity;
  }

  async updatepassword(id: string, data: UpdatePasswordDto) {
    const { password, newpassword } = data;
    const entity = await this.userRespository.findOne(id);

    if (!entity) {
      throw new NotFoundException('Not found User');

      const pass = await entity.comparepassword(password);

      if (!pass) {
        throw new BadRequestException('密码验证失败！');
      }

      entity.password = newpassword;
      return await this.userRespository.save(entity);
    }
  }

  async findOneByName(name: string, password?: boolean) {
    const queryBuilder = await this.userRespository.createQueryBuilder('user');

    queryBuilder
      .where('user.name=:name', { name })
      .leftJoinAndSelect('user.roles', 'roles');

    if (password) {
      queryBuilder.addSelect('user.password');
    }

    const entity = queryBuilder.getOne();
    return entity;
  }

  async update(id: number, data: UserDto) {
    const { roles } = data;

    const entity = await this.userRespository.findOne(id);

    if (roles) {
      entity.roles = roles;
    }

    return await this.userRespository.save(entity);
  }

  // 指定用户拥有特定资源id的函数
  async pocess(id: number, resource: string, resourceid: number) {}
}
