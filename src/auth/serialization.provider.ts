// https://dev.to/nestjs/setting-up-sessions-with-nestjs-passport-and-redis-210
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { User } from '~/users/schemas/user.schema';
import { UsersService } from '~/users/users.service';

interface UserTokenPayload {
  email: string;
  username: string;
}

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: UserTokenPayload) => void) {
    done(null, { email: user.email, username: user.username });
  }

  async deserializeUser(payload: UserTokenPayload, done: (err: Error, user: User) => void) {
    const user = await this.usersService.findOne({ email: payload.email });
    done(null, user);
  }
}
