import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('非开放:roles')
@Controller('roles')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  /**
   *
   * @param 角色Dto 增加角色
   */
  @Post()
  async store(@Body() data: RoleDto) {
    return await this.roleService.store(data);
  }
}
