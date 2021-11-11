import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './routes/products/products.module';
import { UsersModule } from './routes/users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
