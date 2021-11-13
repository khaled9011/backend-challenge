import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { updateProductDTO } from 'src/DTO/updateProductDTO';
import { Product } from 'src/Models/product';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.productService.find(id);
  }

  @Post()
  async create(@Body() prodcut: Product) {
    return this.productService.create(prodcut);
  }

  //asdasdasd
  @Put(':id')
  async update(
    @Body() updateObject: updateProductDTO,
    @Param('id') productId: number,
  ) {
    return this.productService.update(
      productId,
      updateObject.cost,
      updateObject.productName,
      updateObject.amountAvailable,
      updateObject.userId,
    );
  }

  @Delete(':id')
  async delete(@Body() userId: number, @Param('id') productId: number) {
    return this.productService.delete(userId, productId);
  }
}
