import { Injectable } from '@nestjs/common';
import { Product } from 'src/Models/product';
import { Products } from 'src/Models/products';
import users from 'src/userData';
import products from 'src/productsData';

@Injectable()
export class ProductsService {
  products = products;

  findAll() {
    return this.products;
  }

  find(id: number) {
    const product: Product = this.products[id];
    if (product) {
      return product;
    }
    return { error: 'No product with this ID found' };
  }

  create(product: Product) {
    //check if sellerid exists and is type: SELLER
    const valid: boolean = this.validateCreate(product.sellerId);
    if (valid) {
      const id = new Date().valueOf();
      this.products[id] = {
        ...product,
        id,
      };
      return;
    }
    return { error: 'User does not exist or is not SELLER' };
  }

  update(
    id: number,
    cost: number,
    productName: string,
    amountAvailable: number,
    userId: number,
  ) {
    const valid = this.validateUpdate(userId, id);
    if (valid) {
      const product = this.products[id];
      const updated: Product = {
        amountAvailable: amountAvailable
          ? amountAvailable
          : product.amountAvailable,
        cost: cost ? cost : product.cost,
        productName: productName ? productName : product.productName,
        id: product.id,
        sellerId: product.sellerId,
      };
      this.products[id] = updated;
      return;
    }
    return { error: 'User is not the seller of this product.' };
  }

  delete(userId: number, productId: number) {
    const valid = this.validateUpdate(userId, productId);
    if (valid) {
      delete this.products[productId];
      return;
    }
    return { error: 'User is not the seller of this product.' };
  }

  validateUpdate(userId: number, productId: number) {
    const user = users[userId];
    const product = this.products[productId];
    return user.id === product.sellerId;
  }

  validateCreate(id: number): boolean {
    const user = users[id];
    if (user && user.type === 'SELLER') return true;
    return false;
  }
}
