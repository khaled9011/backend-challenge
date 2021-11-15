import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/Models/user';
import { Users } from 'src/Models/users';
import users from 'src/userData';

@Injectable()
export class UsersService {
  readonly users: Users = users;

  findAll() {
    return this.users;
  }

  create(
    username: string,
    password: string,
    type: 'BUYER' | 'SELLER',
    deposit: number,
  ) {
    const id = new Date().valueOf();
    this.users[id] = {
      username,
      password,
      type,
      deposit,
      id,
    };
    return this.users[id];
  }

  find(id: number) {
    const user: User = this.users[id];
    if (user) {
      return user;
    }
    throw new HttpException('Cannot Find User', HttpStatus.NOT_FOUND);
  }

  update(username: string, password: string, id: number) {
    const user = this.users[id];
    if (user) {
      user.username = username ? username : user.username;
      user.password = password ? password : user.password;
      return user;
    }
    throw new HttpException('Cannot Find User', HttpStatus.NOT_FOUND);
  }

  delete(id: number): void {
    const user: User = this.users[id];
    if (user) {
      delete this.users[id];
      return;
    }
    throw new HttpException('Cannot Find User', HttpStatus.NOT_FOUND);
  }
}
