import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/Models/user';
import { Users } from 'src/Models/users';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<Users> {
    return this.userService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<User> {
    return this.userService.find(id);
  }

  @Post()
  async create(@Body() user: User): Promise<void> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Body() user: User, @Param('id') id: number): Promise<void> {
    return this.userService.update(user, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
