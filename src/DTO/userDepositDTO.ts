import { IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

const deposits = [5, 10, 20, 50, 100];

export class userDepositDTO {
  @IsIn(deposits)
  @IsNumber()
  @Type(() => Number)
  amount: number;
}
