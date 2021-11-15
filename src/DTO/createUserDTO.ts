import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

const types = ['BUYER', 'SELLER'];

export default class createUserDTO {
  @IsString()
  @IsNotEmpty()
  username;
  @IsString()
  @IsNotEmpty()
  password;
  @IsString()
  @IsIn(types)
  type;
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  deposit;
}
