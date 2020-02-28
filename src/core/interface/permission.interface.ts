import { UserRole } from '../decorators/enums/user-role.enum';

export interface PermissionInterface {
  role: UserRole;
}
