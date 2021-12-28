import { Question } from "../models/Question.schema";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelType } from 'typegoose';
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "../shared/repository/base.service";

const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class QuestionRepository extends BaseRepository<Question>  {
    constructor(
        @InjectModel(Question) private readonly _questionModel: ModelType<Question>
    ) {
        super();
        this._Model = _questionModel;
    }

    async createQuestion(question: { course: any, question: string }) {
        question.course = ObjectId(question.course);
        return await this.create(question);
    }

    async addReplayToQuestion(questionId, userId, userName: string, reply: string) {
        return this.update(questionId, { $push: { replies: { user: userId, userName: userName, reply: reply } } })
    }

    async getQuestion(questionId) {
        const question = this.findByID(questionId);
        if (!question)
            throw new HttpException('this is not a question', HttpStatus.BAD_REQUEST);
        return question;
    }






}