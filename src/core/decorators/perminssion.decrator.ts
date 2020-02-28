import { PermissionInterface } from '../interface/permission.interface';
import { SetMetadata } from '@nestjs/common';

export const Permissionss = (...permissionss: Partial<PermissionInterface>[]) =>
  SetMetadata('permissionss', permissionss);
