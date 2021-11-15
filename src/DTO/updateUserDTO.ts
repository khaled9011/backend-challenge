import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class updateUserDTO {
  @IsOptional() @IsNotEmpty() @IsString() username;
  @IsOptional() @IsNotEmpty() @IsString() password;
}
