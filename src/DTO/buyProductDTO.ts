import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class buyProductDTO {
  @IsNumber() @Type(() => Number) @IsNotEmpty() productId: number;
  @IsNumber() @Type(() => Number) @Min(1) amount: number;
}
