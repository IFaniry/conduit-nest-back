import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
@ObjectType()
export class User {
  // https://mongoosejs.com/docs/guide.html#id
  readonly id: string;

  @Prop({ unique: true, required: true })
  @Field()
  username: string;

  @Prop({ unique: true, required: true })
  @Field()
  email: string;

  // TODO: add @Field here??
  @HideField()
  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: null })
  @Field({ nullable: true })
  bio?: string;

  @Prop({ required: false, default: null })
  @Field({ nullable: true })
  image?: string;

  @Prop({ default: false })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Boolean)
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
