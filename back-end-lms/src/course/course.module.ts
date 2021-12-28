import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user-repository.service';
import { CourseRepository } from './course-repository.service';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
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
        CourseService,
        UserService,
        UserRepository,
        CourseRepository
    ],
    controllers: [CourseController]
})
export class CourseModule { }

