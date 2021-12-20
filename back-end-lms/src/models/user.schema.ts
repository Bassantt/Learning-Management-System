import { prop, Ref } from '@typegoose/typegoose';
import { IsString, IsEmail, Length } from 'class-validator';

export class User {
  @prop({ required: true })
  @IsString()
  userName: string;
  @Length(4, 12)
  @IsString()
  @prop({ required: true })
  password: string;
  @IsString()
  @IsEmail()
  @prop({ required: true })
  email: string;
  @prop({ required: true })
  @Length(2, 20)
  @IsString()
  firstName: string;
  @prop({ required: true })
  @IsString()
  lastName: string;
  @prop({ required: true })
  @IsString()
  brithDay: string;
  @prop({ required: true })
  @IsString()
  type: string;
}