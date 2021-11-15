import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import createUserDTO from 'src/DTO/createUserDTO';
import updateUserDTO from 'src/DTO/updateUserDTO';
import { User } from 'src/Models/user';
import { Users } from 'src/Models/users';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.userService.find(id);
  }

  @Post()
  create(@Body() userDTO: createUserDTO) {
    const { username, password, type, deposit } = userDTO;
    return this.userService.create(username, password, type, deposit);
  }

  @Put(':id')
  update(@Body() userDTO: updateUserDTO, @Param('id') id: number) {
    const { username, password } = userDTO;
    return this.userService.update(username, password, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
