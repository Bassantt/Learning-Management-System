import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question-repository.service';
import { UserRepository } from '../user/user-repository.service';

@Injectable()
export class QuestionService {
    constructor(
        private readonly QuestionRepository: QuestionRepository,
        private readonly UserRepository: UserRepository
    ) { }

    async addReplyToQuestion(questionId, userId, reply) {
        const user = await this.UserRepository.getUserById(userId);
        await this.QuestionRepository.addReplayToQuestion(questionId, userId, user.userName, reply);

    }

    async getQuestion(questionId) {
        return await this.QuestionRepository.getQuestion(questionId);
    }



}
