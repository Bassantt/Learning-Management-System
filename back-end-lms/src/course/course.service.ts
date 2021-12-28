import { Injectable } from '@nestjs/common';
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

    async addVedioToCourse(userId, courseId, vedioBody: { title: String, link: String }) {
        await this.CourseRepository.updateCourse(userId, courseId, { $push: { activitiesAsVedio: vedioBody } });
    }
    /*
        async addQuestionToCourse(courseId, question: string) {
            await this.CourseRepository.getCourse(courseId);
            const newQuestion = await this.QuestionRepository.create({ course: courseId, question: question });
            await this.CourseRepository.addQuestionToSchema(courseId, newQuestion._id);
        }
    */
    async getCourse(courseId) {
        return await this.CourseRepository.getCourse(courseId);

    }

}
