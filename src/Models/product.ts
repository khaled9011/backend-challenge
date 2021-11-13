import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class Product {
  @IsNumber() @Type(() => Number) amountAvailable: number;
  @IsNumber() @Type(() => Number) cost: number;
  @IsString() productName: string;
  @IsNumber() @Type(() => Number) sellerId: number;
  @IsOptional() @IsNumber() @Type(() => Number) id: number;
}
