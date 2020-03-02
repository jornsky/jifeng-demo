import { Role } from '../role/role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '账号名称' })
  readonly name: string;

  @ApiProperty({ description: '账号密码' })
  readonly password: string;

  @ApiProperty({ description: '用户角色集合', type: [Role] })
  readonly roles: Role[];
}

export class UpdatePasswordDto {
  @ApiProperty({ description: '修改的旧密码' })
  readonly password: string;

  @ApiProperty({ description: '新密码' })
  readonly newpassword: string;
}
