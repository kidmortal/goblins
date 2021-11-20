import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User], { name: 'FindAllUser' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'FindUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }
}
