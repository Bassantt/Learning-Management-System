import { Controller, UseGuards, Get, Put, Request, Param, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CourseService } from '../course/course.service';
import { QuestionService } from './question.service';


@Controller('')
export class QuestionController {
    constructor(
        private questionService: QuestionService

    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('/Questions/:question_id')
    async addQuestion(@Request() req, @Param() Params, @Body() body: { reply: string }) {
        return await this.questionService.addReplyToQuestion(Params.question_id, req.user._id, body.reply);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/Questions/:question_id')
    async getCourse(@Param() Params) {
        return await this.questionService.getQuestion(Params.question_id);
    }



}
