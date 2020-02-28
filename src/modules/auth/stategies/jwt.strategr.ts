import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';
import { UserService } from 'src/modules/user/user.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '320925biq',
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload', payload);
    const { name } = payload;
    console.log(this.userService);

    const entity = await this.userService.findOneByName(name);

    if (!entity) {
      done(new UnauthorizedException('没找到用户'));
    }

    done(null, entity);
  }
}
