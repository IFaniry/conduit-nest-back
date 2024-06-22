import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { JwtAuthGuard } from '~/auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('input') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('input') id: FindUserInput) {
    return this.usersService.findOne(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args('input', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
