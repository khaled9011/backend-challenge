import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import createProductDTO from 'src/DTO/createProductDTO';
import deleteProductDTO from 'src/DTO/deleteProductDTO';
import { updateProductDTO } from 'src/DTO/updateProductDTO';
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
  async create(@Body() prodcutDTO: createProductDTO) {
    const { productName, amountAvailable, cost, sellerId }: createProductDTO =
      prodcutDTO;

    return this.productService.create(
      productName,
      amountAvailable,
      cost,
      sellerId,
    );
  }

  @Put(':id')
  async update(
    @Body() prodcutDTO: updateProductDTO,
    @Param('id') productId: number,
  ) {
    const { productName, amountAvailable, cost, userId } = prodcutDTO;
    return this.productService.update(
      productId,
      cost,
      productName,
      amountAvailable,
      userId,
    );
  }

  @Delete(':id')
  async delete(
    @Body() productDTO: deleteProductDTO,
    @Param('id') productId: number,
  ) {
    const { userId } = productDTO;
    return this.productService.delete(userId, productId);
  }
}
