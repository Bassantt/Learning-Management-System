import { prop, Ref } from '@typegoose/typegoose';
import { IsString, IsEmail, Length } from 'class-validator';
import { Course } from './course.schema';

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
  @prop({ required: false, default: "customer" })
  @IsString()
  type?: string;
  @prop({ required: false, default: "Learner" })
  @IsString()
  role?: string;
  @prop({ required: false, default: [] })
  @prop({ ref: Course })
  courses?: [Ref<Course>];
}