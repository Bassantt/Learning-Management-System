import { prop, Ref } from '@typegoose/typegoose';
import { IsString, ArrayUnique } from 'class-validator';
import { User } from './user.schema';
import { Question } from './question.schema';
export class Course {
    @prop({ required: true })
    @IsString()
    description: string;
    @prop({ required: true })
    @prop({ ref: User })
    instructor: Ref<User>;
    @ArrayUnique()
    @prop({ required: false, default: [] })
    activitiesAsPDF?: [{ title: String, link: String }]
    @ArrayUnique()
    @prop({ required: false, default: [] })
    activitiesAsVedio?: [{ title: String, link: String }]
    @ArrayUnique()
    @prop({ required: false, default: [] })
    @prop({ ref: Question })
    questions?: [Ref<Question>];

}