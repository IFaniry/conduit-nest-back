import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { User } from '~/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GqlLocalAuthGuard } from './guards/local.guard';
import { SessionLocalAuthGuard } from './guards/session.guard';
import { CurrentUser } from './user.decorator';
import { LoginUserInput } from './dto/login.input';
import { LoginUserResponse } from './dto/login.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @UseGuards(GqlLocalAuthGuard, SessionLocalAuthGuard)
  @Mutation(() => LoginUserResponse, {
    description: 'login using email/password to obtain a JWT token',
  })
  async login(
    @Args('input') loginUserInput: LoginUserInput,
    // @CurrentUser() user,
  ) {
    const token = await this.authService.getUserToken(loginUserInput);

    return {
      access_token: token,
      // user: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { description: 'returns current logged in user' })
  async currentUser(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }
}
