import { InputType, PickType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class FindUserInput extends PickType(CreateUserInput, [
  'email',
] as const) {}
