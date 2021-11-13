import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  money?: number;
  @ApiProperty()
  @IsUrl()
  @IsOptional()
  iconUrl?: string;
}
