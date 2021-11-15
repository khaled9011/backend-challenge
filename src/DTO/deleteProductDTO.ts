import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export default class deleteProductDTO {
  @IsNumber()
  @Type(() => Number)
  userId: number;
}
