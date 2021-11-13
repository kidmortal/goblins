import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Product } from '.prisma/client';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  senderId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  receiverId: number;
  @ApiProperty()
  @IsNotEmpty()
  product: Product;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
