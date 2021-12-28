import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user-repository.service';
import { QuestionRepository } from '../question/question-repository.service'
import { CourseRepository } from '../course/course-repository.service';
import { CourseService } from '../course/course.service';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "../models/user.schema";
import { Course } from "../models/course.schema";
import { Question } from 'src/models/question.schema';
import { SharedModule } from '../shared/shared.module'
@Module({
  imports: [SharedModule,
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Question]),
    TypegooseModule.forFeature([Course])
  ],
  providers: [
    CourseService,
    UserService,
    UserRepository,
    CourseRepository,
    QuestionRepository,
    QuestionService
  ],
  controllers: [QuestionController]
})
export class QuestionModule { }
