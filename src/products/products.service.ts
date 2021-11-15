import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'src/Models/product';
import { Products } from 'src/Models/products';
import users from 'src/userData';
import products from 'src/productsData';

@Injectable()
export class ProductsService {
  readonly products: Products = products;

  findAll() {
    return this.products;
  }

  find(id: number) {
    const product: Product = this.products[id];
    if (product) {
      return product;
    }
    throw new HttpException(
      { error: 'No product with this ID found' },
      HttpStatus.NOT_FOUND,
    );
  }

  create(
    productName: string,
    amountAvailable: number,
    cost: number,
    sellerId: number,
  ) {
    const valid: boolean = this.validateCreate(sellerId);
    if (valid) {
      const id = new Date().valueOf();
      this.products[id] = {
        productName,
        amountAvailable,
        cost,
        sellerId,
        id,
      };
      return this.products[id];
    }
    throw new HttpException(
      { error: 'User does not exist or is not SELLER' },
      HttpStatus.NOT_FOUND,
    );
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
      return this.products[id];
    }
    throw new HttpException(
      { error: 'User is not the seller of this product.' },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  delete(userId: number, productId: number) {
    const valid = this.validateUpdate(userId, productId);
    if (valid) {
      delete this.products[productId];
      return;
    }
    throw new HttpException(
      { error: 'User is not the seller of this product.' },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }

  private validateUpdate(userId: number, productId: number) {
    const user = users[userId];
    const product = this.products[productId];
    return user && product ? user.id === product.sellerId : false;
  }

  private validateCreate(id: number): boolean {
    const user = users[id];
    if (user && user.type === 'SELLER') return true;
    return false;
  }
}
