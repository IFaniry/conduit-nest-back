import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { User } from '~/users/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(findUserInput: FindUserInput) {
    const { email } = findUserInput;
    const user = await this.userModel.findOne({ email });

    return user;
  }

  // TODO: https://youtu.be/E33swXzDsnc?t=580
  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
