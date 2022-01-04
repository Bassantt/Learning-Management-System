import {
    Controller,
    UseGuards,
    Get,
    Res,
    Put,
    Request,
    Param,
    Body,
    Post,
    HttpCode,
    Header,
    HttpStatus,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { CourseService, editFileName } from './course.service';
import { createReadStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('')
export class CourseController {
    constructor(
        private userService: UserService,
        private courseService: CourseService

    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('/me/courses')
    async createCourse(@Request() req, @Body() courseData: { description: string; name: string; instructorInfo?: string; syllabus?: [{ week_number: Number, title: String }]; }) {
        return await this.userService.createCourse(req.user._id, courseData);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/me/courses/:course_id')
    async updateCourse(@Request() req, @Param() Params, @Body() courseData: { description?: string; name?: string; instructorInfo?: string; syllabus?: [{ week_number: Number, title: String }]; }) {
        const user = await this.userService.getUserByID(req.user._id);
        return await this.courseService.updateCourse(req.user._id, Params.course_id, courseData, user.type);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/me/courses/:course_id/video')
    async addVideo(@Request() req, @Param() Params, @Body() videoData: { title: String, link: String }) {
        const user = await this.userService.getUserByID(req.user._id);
        return await this.courseService.addVedioToCourse(req.user._id, Params.course_id, videoData, user.type);
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

    @UseGuards(AuthGuard('jwt'))
    @Post('/me/courses/:course_id/pdf')
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: '../uploads',
            filename: editFileName,
        }),
    }))
    async uploadpdf(@UploadedFile() file, @Param() Params, @Request() req) {
        const user = await this.userService.getUserByID(req.user._id);
        await this.courseService.addPdfToCourse(req.user._id, Params.course_id, file, user.type);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/user/:user_id/courses')
    async getUserCourses(@Param() Param) {
        const courses = await this.userService.getInstractorCourses(Param.user_id);
        return { courses };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me/courses')
    async getMyCourses(@Request() req) {
        const courses = await this.userService.getInstractorCourses(req.user._id);
        return { courses };
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('/courses/file/:link')
    getFile(@Res() res: Response, @Param() params) {
        const file = createReadStream(join(process.cwd(), '../uploads/' + params.link));
        file.pipe(res);
    }




}
