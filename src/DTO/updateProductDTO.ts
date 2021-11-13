import { IsNumber, IsOptional } from 'class-validator';

export class updateProductDTO {
  @IsNumber() @IsOptional() amountAvailable: number;
  @IsNumber() @IsOptional() cost: number;
  @IsNumber() @IsOptional() productName: string;
  @IsNumber() userId: number;
}
