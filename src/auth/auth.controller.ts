import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    // this.authService.test()
  }

  @Post('signup')
  signup(@Body() dto: IAuthDto) {
    return this.authService.signup(dto);
  }

  // signup(
  //   @Body('email') email: string,
  //   @Body('password', ParseIntPipe) password: string,
  // ) {
  //   console.log({ email, password });
  //   return this.authService.signup();
  // }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: IAuthDto) {
    return this.authService.signin(dto);
  }
}
