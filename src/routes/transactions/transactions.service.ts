import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(transaction: CreateTransactionDto) {
    const { productId, senderId, receiverId, amount } = transaction;
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      include: { UserHasProduct: true },
    });
    if (!sender) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `No sender user with id ${senderId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const sendingProduct = await sender.UserHasProduct.find(
      (product) => product.productId === productId,
    );
    if (!sendingProduct) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Sending user doesnt have item id ${productId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (sendingProduct.amount < amount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Sending user doesnt have enough of this item, 
                  sending: ${amount}, 
                  have: ${sendingProduct.amount}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
      include: { UserHasProduct: true },
    });

    if (!receiver) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `No receiver user with id ${receiverId}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: { id: senderId },
      data: {
        UserHasProduct: {
          update: {
            where: {
              userId_productId: {
                productId: productId,
                userId: senderId,
              },
            },
            data: {
              amount: sendingProduct.amount - amount,
            },
          },
        },
      },
    });
    await this.prisma.user.update({
      where: { id: receiverId },
      data: {
        UserHasProduct: {
          upsert: {
            update: {
              productId: productId,
              amount: { increment: amount },
            },
            create: {
              productId: productId,
              amount: amount,
            },
            where: {
              userId_productId: {
                userId: receiverId,
                productId: productId,
              },
            },
          },
        },
      },
    });

    return this.prisma.transaction.create({
      data: {
        productId: productId,
        receiverId: receiverId,
        senderId: senderId,
        amount: amount,
      },
    });
  }

  async give(transaction: CreateTransactionDto) {
    const { productId, receiverId, amount } = transaction;
    return this.prisma.user.update({
      where: { id: receiverId },
      data: {
        UserHasProduct: {
          upsert: {
            update: {
              productId: productId,
              amount: { increment: amount },
            },
            create: {
              productId: productId,
              amount: amount,
            },
            where: {
              userId_productId: {
                userId: receiverId,
                productId: productId,
              },
            },
          },
        },
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
