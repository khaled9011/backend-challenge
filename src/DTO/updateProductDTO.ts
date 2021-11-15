import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class updateProductDTO {
  @IsNumber() @Type(() => Number) @IsOptional() amountAvailable: number;
  @IsNumber() @Type(() => Number) @IsOptional() cost: number;
  @IsString() @IsOptional() productName: string;
  @IsNumber() @Type(() => Number) userId: number;
}
