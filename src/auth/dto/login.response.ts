import { ObjectType, Field } from '@nestjs/graphql';
// import { User } from '~/users/schemas/user.schema';

@ObjectType()
export class LoginUserResponse {
  @Field()
  access_token: string;

  // @Field(() => User)
  // user: User;
}
