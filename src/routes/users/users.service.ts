import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { name: createUserDto.name },
    });
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Username ${createUserDto.name} is already being used`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.user.create({
      data: { ...createUserDto, money: 100 },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        UserHasProduct: { include: { product: true } },
        Listing: true,
      },
    });
  }

  giveProductToUser(productId: number, amount: number, userId: number) {
    return this.prisma.userHasProduct.upsert({
      where: { userId_productId: { productId, userId } },
      create: {
        amount,
        productId,
        userId,
      },
      update: {
        amount: { increment: amount },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        UserHasProduct: { include: { product: true } },
        Listing: { include: { product: true } },
      },
    });
  }

  findByName(name: string) {
    return this.prisma.user.findUnique({ where: { name } });
  }
  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }
  findByDiscordId(discordId: string) {
    return this.prisma.user.findFirst({ where: { discordId } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
