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





}