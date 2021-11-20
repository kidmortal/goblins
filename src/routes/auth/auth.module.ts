import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/services/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { jwtConstants } from '../auth/shared/constants';
import { JwtStrategy } from '../auth/shared/jwt.strategy';
import { LocalStrategy } from '../auth/shared/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    PrismaService,
    JwtStrategy,
    UsersService,
  ],
})
export class AuthModule {}
