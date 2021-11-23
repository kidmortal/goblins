import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { PrismaService } from '../../services/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService, PrismaService, UsersService],
})
export class ListingsModule {}
