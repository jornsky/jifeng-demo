import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const { name, password } = data;
    const entity = await this.userService.findOneByName(name);

    if (!entity) {
      throw new UnauthorizedException('用户名不存在');
    }

    if (!(await entity.comparepassword(password))) {
      throw new UnauthorizedException('密码不匹配');
    }
    // 签发
    const { id } = entity;
    const payload = { id, name };
    const token = this.signToken(payload);
    return {
      ...payload,
      token,
    };

    // return entity;
  }

  signToken(data: JwtPayload) {
    return this.jwtService.sign(data);
  }
}
