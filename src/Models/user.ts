import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class User {
  @IsString() username: string;
  @IsString() password: string;
  @IsString() type: 'BUYER' | 'SELLER';
  @IsNumber() @Type(() => Number) deposit: number;
  @IsNumber() @Type(() => Number) id: number;
}
