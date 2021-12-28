import { Controller, UseGuards, Get, Put, Request, Param, Body, Post, HttpCode, Header, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { CourseService } from './course.service';
import { createReadStream } from 'fs';

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

    @UseGuards(AuthGuard('jwt'))
    @Put('/me/courses/:course_id')
    async updateCourse(@Request() req, @Param() Params, @Body() courseData: { description: string; name: string; }) {
        return await this.courseService.updateCourse(req.user._id, Params.course_id, courseData);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/me/courses/:course_id/video')
    async addVideo(@Request() req, @Param() Params, @Body() videoData: { title: String, link: String }) {
        return await this.courseService.addVedioToCourse(req.user._id, Params.course_id, videoData);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/courses/:course_id')
    async addQuestion(@Param() Params, @Body() body: { question: string }) {
        return await this.courseService.addQuestionToCourse(Params.course_id, body.question);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/courses/:course_id')
    async getCourse(@Param() Params) {
        return await this.courseService.getCourse(Params.course_id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/courses/:course_id/questions')
    async getCourseQustions(@Param() Params) {
        return await this.courseService.getCourseQuestions(Params.course_id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/courses')
    async getCourses() {
        return await this.courseService.getAllCourses();
    }


    @Get('pdf')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename=test.pdf')
    pdf() {
        return createReadStream('./nodejs.pdf');
    }


}
