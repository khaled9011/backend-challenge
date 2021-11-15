import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'src/Models/product';
import { User } from 'src/Models/user';
import users from 'src/userData';
import products from 'src/productsData';

@Injectable()
export class UserService {
  deposit(amount: number, id: number) {
    const user: User = users[id];
    if (user.type === 'SELLER')
      throw new HttpException(
        { error: 'User is not of type BUYER' },
        HttpStatus.BAD_REQUEST,
      );
    if (user) {
      user.deposit += +amount;
      return;
    }
    throw new HttpException(
      { error: 'user with this ID not found' },
      HttpStatus.NOT_FOUND,
    );
  }

  buy(userId: number, productId: number, amount: number) {
    const product: Product = products[productId];
    if (product) {
      const user: User = users[userId];
      if (user.type === 'SELLER')
        throw new HttpException(
          { error: 'User is not of type BUYER' },
          HttpStatus.BAD_REQUEST,
        );
      const totalPay = product.cost * amount;
      if (user.deposit >= totalPay) {
        user.deposit -= totalPay;
        const change = this.calculateChange(user.deposit);
        return {
          totalSpent: totalPay,
          productPurchased: product.productName,
          change: {
            5: change[0],
            10: change[1],
            20: change[2],
            50: change[3],
            100: change[4],
          },
        };
      }
      throw new HttpException(
        { error: 'User does not have sufficient funds' },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    throw new HttpException(
      { error: 'Product with this ID does not Exist' },
      HttpStatus.NOT_FOUND,
    );
  }

  reset(userId: number) {
    const user: User = users[userId];
    if (user.type === 'SELLER')
      throw new HttpException(
        { error: 'User is not of type BUYER' },
        HttpStatus.BAD_REQUEST,
      );
    if (user) {
      user.deposit = 0;
      return;
    }
    throw new HttpException(
      { error: 'User with this ID not found' },
      HttpStatus.NOT_FOUND,
    );
  }

  private calculateChange(total: number) {
    const hundreds = Math.floor(total / 100);
    total -= hundreds * 100;
    const fifties = Math.floor(total / 50);
    total -= fifties * 50;
    const twenties = Math.floor(total / 20);
    total -= twenties * 20;
    const tens = Math.floor(total / 10);
    total -= tens * 10;
    const fives = Math.floor(total / 5);
    return [fives, tens, twenties, fifties, hundreds];
  }
}
