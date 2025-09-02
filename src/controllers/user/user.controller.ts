import { CreateUserRequestBodyDto, UpdateUserRequestBodyDto } from '@dto/user.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '@services/user/user.service';

@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: CreateUserRequestBodyDto) {
    return this.userService.create(body);
  }

  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserRequestBodyDto) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}
