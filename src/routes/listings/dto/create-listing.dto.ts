import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateListingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellerId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
