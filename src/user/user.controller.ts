import { Body, Controller, Param, Post } from '@nestjs/common';
import { buyProductDTO } from 'src/DTO/buyProductDTO';
import { userDepositDTO } from 'src/DTO/userDepositDTO';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/deposit/:id')
  deposit(@Param('id') userId, @Body() deposit: userDepositDTO) {
    const { amount } = deposit;
    const id = userId;
    return this.userService.deposit(amount, id);
  }

  @Post('/buy/:id')
  buy(@Param('id') userId: number, @Body() buyProductDTO: buyProductDTO) {
    const { productId, amount } = buyProductDTO;
    return this.userService.buy(userId, productId, amount);
  }

  @Post('/reset/:id')
  reset(@Param('id') id) {
    return this.userService.reset(id);
  }
}
