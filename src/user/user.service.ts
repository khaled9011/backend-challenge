import { Injectable } from '@nestjs/common';
import { Product } from 'src/Models/product';
import { User } from 'src/Models/user';
const users = require('../userData');
const products = require('../productsData');

@Injectable()
export class UserService {
  deposit(amount: number, id: number) {
    const user: User = users[id];
    if (user) {
      user.deposit += amount;
      return;
    }
    return { message: 'user with this ID not found' };
  }

  buy(userId: number, productId: number, amount: number) {
    const product: Product = products[productId];
    if (product) {
      const user: User = users[userId];
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
      return { error: 'User does not have sufficient funds' };
    }
    return { error: 'Product with this ID does not Exist' };
  }

  reset(userId: number) {
    const user: User = users[userId];
    if (user) {
      return (user.deposit = 0);
    }
    return { error: 'User with this ID not found' };
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
