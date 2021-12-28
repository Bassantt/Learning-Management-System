import { Controller, UseGuards, Get, Put, Request, Param, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
    constructor(
        private userService: UserService,
        private courseService: CourseService

    ) { }
    @UseGuards(AuthGuard('jwt'))
    @Post('/me/courses')
    async createCourse(@Request() req, @Body() courseData: { description: string; name: string; }) {
        return await this.userService.createCourse(req.user._id, courseData);
    }
}
