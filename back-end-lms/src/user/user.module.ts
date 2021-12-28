import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user-repository.service';
import { CourseRepository } from '../course/course-repository.service';
import { UserController } from './user.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "../models/user.schema";
import { Course } from "../models/course.schema";
import { SharedModule } from '../shared/shared.module'
@Module({
  imports: [SharedModule,
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Course])

  ],
  providers: [
    UserService,
    UserRepository,
    CourseRepository
  ],
  controllers: [UserController]
})
export class UserModule { }
