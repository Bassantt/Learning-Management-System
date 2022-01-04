import { Course } from "../models/course.schema";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDto } from './dto/creation.dto';
import { ModelType } from 'typegoose';
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "../shared/repository/base.service";

const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CourseRepository extends BaseRepository<Course>  {
    constructor(
        @InjectModel(Course) private readonly _courseModel: ModelType<Course>
    ) {
        super();
        this._Model = _courseModel;
    }

    async createCourse(course: CreateDto) {
        return await this.create(course);
    }

    async updateCourse(instructorId, courseId, updatedData: {}, userType: string) {
        if (userType.toLowerCase() == "admin")
            if (!await this.updateByData({ _id: courseId }, updatedData))
                throw new HttpException('this is not a course!', HttpStatus.BAD_REQUEST);
        if (!await this.updateByData({ _id: courseId, instructor: instructorId }, updatedData))
            throw new HttpException('You do not the instructor of this course', HttpStatus.FORBIDDEN);
    }

    async addQuestionToSchema(courseId, QuestionId) {
        if (!await this.update(courseId, { $push: { questions: QuestionId } }))
            throw new HttpException('this is not a course', HttpStatus.BAD_REQUEST);
    }

    async getCourse(courseId) {
        const course = await this.findByID(courseId);
        if (!course)
            throw new HttpException('this is not a course', HttpStatus.BAD_REQUEST);
        return course;
    }

    async getAllCourses() {
        return await this.findAll();
    }





}