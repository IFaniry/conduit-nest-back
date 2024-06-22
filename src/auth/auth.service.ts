import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '~/users/schemas/user.schema';
import { UsersService } from '~/users/users.service';
import { LoginUserInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // TODO: actually use it
  async createPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  }

  async verifyPassword({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }): Promise<boolean> {
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    return isPasswordCorrect;
  }

  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    const user = await this.usersService.findOne({ email });

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async getUserToken({ email }: LoginUserInput): Promise<string> {
    const { username } = await this.usersService.findOne({ email });

    const token = await this.jwtService.signAsync({ email, username });

    return token;
  }
}
