import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException({
        message: 'Su contraseña o usuario están incorrectos.',
        code: HttpStatus.UNAUTHORIZED,
      })
    }
    return user
  }
}
