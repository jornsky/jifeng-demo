import { UserRole } from 'src/core/decorators/enums/user-role.enum';

export class RoleDto {
  readonly name: UserRole;
  readonly alias: string;
}
