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
import { DiscordService } from './services/discord/discord.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';

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
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    ProductsModule,
    UsersModule,
    TransactionModule,
    ListingsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    DiscordService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
