import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class buyProductDTO {
  @IsNumber() @Type(() => Number) productId: number;
  @IsNumber() @Type(() => Number) @Min(1) amount: number;
}
