import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsString()
  name?: string;
  @ApiProperty()
  @IsNumber()
  money?: number;
  @ApiProperty()
  @IsUrl()
  iconUrl?: string;
}
