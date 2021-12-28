import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from "../models/user.schema";
import { TypegooseModule } from "nestjs-typegoose";
import { UserRepository } from '../user/user-repository.service';
import { Course } from "../models/course.schema";
import { CourseRepository } from '../course/course-repository.service';


@Module({
    imports: [
        TypegooseModule.forFeature([User]),
        TypegooseModule.forFeature([Course])
    ],
    providers: [
        UserService,
        UserRepository,
        CourseRepository
    ]
})
export class SharedModule { }
