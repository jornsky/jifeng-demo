import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './stategies/jwt.strategr';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      // sercert 或者秘钥
      secret: '320925biq',
      signOptions: {
        // 300s
        expiresIn: 300,
      },
    }),

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
