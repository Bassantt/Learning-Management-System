import { prop, Ref } from '@typegoose/typegoose';
import { IsString } from 'class-validator';
import { Course } from './course.schema';
import { User } from './User.schema';
export class Question {
    @prop({ required: true })
    @IsString()
    question: string;
    @prop({ required: true })
    @prop({ ref: Course })
    course: Ref<Course>;
    @prop({ required: false })
    replies?: [{}]

}