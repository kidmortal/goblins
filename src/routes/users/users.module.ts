import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../services/prisma.service';
import { UserResolver } from './user.resolver';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
