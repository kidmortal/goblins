import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { ProductsModule } from './routes/products/products.module';
import { UsersModule } from './routes/users/users.module';
import { TransactionModule } from './routes/transactions/transactions.module';
import { ListingsModule } from './routes/listings/listings.module';
import { AuthModule } from './routes/auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TransactionModule,
    ListingsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
