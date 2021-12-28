import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { CourseModule } from './course/course.module';
import { QuestionModule } from './question/question.module';


@Module({
  imports: [
    TypegooseModule.forRoot(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    SharedModule,
    CourseModule,
    QuestionModule,
  ],
  controllers: [],
  providers: [],

}) export class AppModule { }
