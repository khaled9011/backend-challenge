import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export default class createProductDTO {
  @IsString()
  @IsNotEmpty()
  productName: string;
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  amountAvailable: number;
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  cost: number;
  @IsNumber()
  @Type(() => Number)
  sellerId: number;
}
