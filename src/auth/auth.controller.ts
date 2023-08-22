import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthService, IUser } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { LocalAuthGuard } from './auth.local-auth.guards'
import { JwtAuthGuard } from './jwt-auth.guard'
import { PermissionsGuard } from 'src/permissions/permission.guard'

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: IUser }) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: IUser }) {
    return await this.userService.findOne(req.user.id).catch((e) => {
      new HttpException(
        { message: e.message, detail: e },
        HttpStatus.BAD_REQUEST,
      )
    })
  }
}
