import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { PermissionInterface } from '../interface/permission.interface';
import { User } from 'src/modules/user/user.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { UserRole } from '../decorators/enums/user-role.enum';

@Injectable()
export class AccessGuard implements CanActivate {
  /**
   * 注入依赖得到decorator 的SetMeta 属性
   * @param reflector
   */
  constructor(private readonly reflector: Reflector) {}
  /**
   * @description 根据一些条件返回true or false决定是否有权限访问
   * @param context
   */

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('request', request.user.roles);

    // 利用反射得到 custom metaData 自定义元数据
    const permissionss = this.reflector.get(
      'permissionss',
      context.getHandler(),
    );
    // console.log(request.user);
    const results = await this.validatePermissionss(permissionss, request.user);

    return results.includes(true);
  }
  async validatePermissionss(permissionss: PermissionInterface[], user: User) {
    const results = permissionss.map(async premission => {
      const { role } = premission;
      let hasRole: boolean;

      if (role) {
        hasRole = user.roles.some(UserRole => UserRole.name === role);
      }

      return hasRole;
    });

    return Promise.all(results);
  }
}
