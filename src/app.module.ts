import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './routes/products/products.module';
import { UsersModule } from './routes/users/users.module';
import { TransactionModule } from './routes/transactions/transactions.module';

@Module({
  imports: [ProductsModule, UsersModule, TransactionModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
