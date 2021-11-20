import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';

@ApiTags('listings')
@Controller('goblin/listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto, req.user);
  }

  @Get()
  findAll() {
    return this.listingsService.findAll();
  }
  @Get('page/:page')
  findAllPage(@Param('page') page: string) {
    return this.listingsService.findAllPage(+page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}
