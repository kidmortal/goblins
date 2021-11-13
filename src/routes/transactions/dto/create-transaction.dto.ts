import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

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
  @IsNumber()
  productId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
