import { IsNumber, Min } from 'class-validator';

export class buyProductDTO {
  @IsNumber() productId: number;
  @IsNumber() @Min(1) amount: number;
}
