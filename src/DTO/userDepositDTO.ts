import { IsNumber, IsIn } from 'class-validator';

const deposits = [5, 10, 20, 50, 100];

export class userDepositDTO {
  @IsIn(deposits)
  @IsNumber()
  amount: number;
}
