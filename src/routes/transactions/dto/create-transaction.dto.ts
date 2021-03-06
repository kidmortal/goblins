import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  listingId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  receiverId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
