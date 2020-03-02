import { UserRole } from 'src/core/decorators/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ description: '角色名称' })
  readonly name: UserRole;

  @ApiProperty({ description: '登入别名' })
  readonly alias: string;
}
