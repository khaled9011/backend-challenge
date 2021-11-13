import { Injectable } from '@nestjs/common';
import { User } from 'src/Models/user';
import { Users } from 'src/Models/users';
import users from 'src/userData';

@Injectable()
export class UsersService {
  readonly users: Users = users;

  findAll() {
    return this.users;
  }

  create(newUser: User) {
    const id = new Date().valueOf();
    this.users[id] = {
      ...newUser,
      id,
    };
  }

  find(id: number) {
    const user: User = this.users[id];
    if (user) {
      return user;
    }
    throw new Error('Cannot Find User');
  }

  update(updatedUser: User, id: number) {
    const user = this.users[id];
    if (user) {
      this.users[id] = updatedUser;
      return;
    }
    throw new Error('Cannot Find User');
  }

  delete(id: number): void {
    const user: User = this.users[id];
    if (user) {
      delete this.users[id];
      return;
    }
    throw new Error('Cannot Find User');
  }
}
