import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AccessGuard } from 'src/core/gurds/access.guard';
import { UserRole } from 'src/core/decorators/enums/user-role.enum';
import { Permissionss } from 'src/core/decorators/perminssion.decrator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('非开放：users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @權限 管理員
   * @param UserDto
   * @returns 创建一个User
   */
  @Post()
  async store(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async showOne(@Param('id') id: string) {
    return await this.userService.showOne(id);
  }

  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() date: UpdatePasswordDto,
  ) {
    return await this.userService.updatepassword(id, date);
  }

  /**
   * 修改用戶角色
   * @权限  AuthGuard  AccessGuard  先登入
   * @param id
   * @param data 实际提交的是roles
   */
  @Put(':id')
  @UseGuards(AccessGuard)
  @Permissionss({ role: UserRole.ADMIN })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
    return await this.userService.update(id, data);
  }
}
