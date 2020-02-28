import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
