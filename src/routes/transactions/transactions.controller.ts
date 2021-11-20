import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';

@ApiTags('transactions')
@Controller('goblin/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: any,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.create(createTransactionDto, req.user);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
