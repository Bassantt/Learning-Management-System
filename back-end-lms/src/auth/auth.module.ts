import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "../models/user.schema";
import { Course } from "../models/course.schema";
import { JwtStrategy } from './jwt.strategy';
import { SharedModule } from '../shared/shared.module';
import { UserRepository } from '../user/user-repository.service';
import { CourseRepository } from '../course/course-repository.service';

@Module({
  imports: [SharedModule,
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Course])

  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    UserRepository,
    CourseRepository
  ],
  controllers: [AuthController]
})
export class AuthModule { }

