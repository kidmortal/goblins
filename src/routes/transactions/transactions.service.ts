import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(transaction: CreateTransactionDto) {
    const { id } = transaction.product;
    const sender = await this.prisma.user.findUnique({
      where: { id: transaction.senderId },
      include: { UserHasProduct: true },
    });
    if (!sender) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `No sender user with id ${transaction.senderId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const sendingProduct = await sender.UserHasProduct.find(
      (product) => product.productId === transaction.product.id,
    );
    if (!sendingProduct) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Sending user doesnt have item id ${transaction.product.id}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (sendingProduct.amount < transaction.amount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Sending user doesnt have enough of this item, 
                  sending: ${transaction.amount}, 
                  have: ${sendingProduct.amount}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const receiver = await this.prisma.user.findUnique({
      where: { id: transaction.receiverId },
      include: { UserHasProduct: true },
    });

    if (!receiver) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `No receiver user with id ${transaction.receiverId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: { id: transaction.senderId },
      data: {
        UserHasProduct: {
          update: {
            where: {
              userId_productId: {
                productId: transaction.product.id,
                userId: sender.id,
              },
            },
            data: {
              amount: sendingProduct.amount - transaction.amount,
            },
          },
        },
      },
    });
    await this.prisma.user.update({
      where: { id: transaction.receiverId },
      data: {
        UserHasProduct: {
          upsert: {
            update: {
              productId: transaction.product.id,
              amount: { increment: transaction.amount },
            },
            create: {
              productId: transaction.product.id,
              amount: transaction.amount,
            },
            where: {
              userId_productId: {
                userId: receiver.id,
                productId: transaction.product.id,
              },
            },
          },
        },
      },
    });

    return this.prisma.transaction.create({
      data: {
        productId: id,
        receiverId: transaction.receiverId,
        senderId: transaction.senderId,
        amount: transaction.amount,
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany();
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }
}
