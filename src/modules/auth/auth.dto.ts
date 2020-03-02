import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '登入名称' })
  name: string;

  @ApiProperty({ description: '登入密码' })
  password: string;
}
