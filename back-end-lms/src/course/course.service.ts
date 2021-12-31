import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CourseRepository } from './course-repository.service';
import { UserRepository } from '../user/user-repository.service';
import { QuestionRepository } from '../Question/question-repository.service';

@Injectable()
export class CourseService {
    constructor(private readonly QuestionRepository: QuestionRepository,
        private readonly CourseRepository: CourseRepository
    ) { }

    async updateCourse(userId, courseId, updatedData) {
        await this.CourseRepository.updateCourse(userId, courseId, updatedData);
    }

    async addPdfToCourse(userId, courseId, file) {
        console.log(file)
        await this.CourseRepository.updateCourse(userId, courseId, { $push: { activitiesAsPDF: { link: file.filename, title: file.originalname } } });
    }

    async addVedioToCourse(userId, courseId, vedioBody: { title: String, link: String }) {
        await this.CourseRepository.updateCourse(userId, courseId, { $push: { activitiesAsVedio: vedioBody } });
    }

    async addQuestionToCourse(courseId, question: string) {
        await this.CourseRepository.getCourse(courseId);
        const newQuestion = await this.QuestionRepository.create({ course: courseId, question: question });
        await this.CourseRepository.addQuestionToSchema(courseId, newQuestion._id);
    }

    async getCourse(courseId) {
        return await this.CourseRepository.getCourse(courseId);

    }

    async getAllCourses() {
        return await this.CourseRepository.getAllCourses();
    }

    async getCourseQuestions(courseId) {
        const course = await this.CourseRepository.getCourse(courseId);
        var questions = []
        if (course.questions && course.questions != [])
            for (let i = 0; i < course.questions.length; i++) {
                const question = await this.QuestionRepository.getQuestion(course.questions[i][0]);
                questions.push(question);
            }
        return questions;
    }

    async

}


export const editFileName = (res, file, callback) => {
    if (file == undefined) throw new HttpException('Enter file param', HttpStatus.BAD_REQUEST);
    if (file.originalname.split('.').length > 1) {
        const name = file.originalname.split('.')[0];
        const fileExtName = '.' + file.originalname.split('.')[1];
        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        callback(null, `${name}-${randomName}${fileExtName}`);
    }
    else {
        const name = file.originalname;
        const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        callback(null, `${name}-${randomName}`);
    }

};