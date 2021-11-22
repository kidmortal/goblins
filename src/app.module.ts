import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './services/prisma.service';
import { ProductsModule } from './routes/products/products.module';
import { UsersModule } from './routes/users/users.module';
import { TransactionModule } from './routes/transactions/transactions.module';
import { ListingsModule } from './routes/listings/listings.module';
import { AuthModule } from './routes/auth/auth.module';
import { join } from 'path';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    GraphQLModule.forRoot({
      include: [UsersModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ThrottlerModule.forRoot({
      ttl: 5,
      limit: 10,
    }),
    ProductsModule,
    UsersModule,
    TransactionModule,
    ListingsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [PrismaService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
