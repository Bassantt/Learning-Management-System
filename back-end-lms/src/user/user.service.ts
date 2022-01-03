import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from "../models/user.schema";
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user-repository.service';
import { CourseRepository } from '../course/course-repository.service';
import { CreateDto } from '../course/dto/creation.dto'
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly UserRepository: UserRepository,
        private readonly CourseRepository: CourseRepository
    ) {

    }
    async getUserByID(userID): Promise<User | null> {
        const user = await this.UserRepository.findByID(userID);
        if (!user)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        return user;
    }

    async createUser(createUserDto: {
        userName: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        brithDay: string;
        type?: string;
    }) {
        if (await this.UserRepository.findByEmailORUserName(createUserDto.email))
            throw new HttpException('"email" should not have acount', HttpStatus.FORBIDDEN,);
        if (await this.UserRepository.findByEmailORUserName(createUserDto.userName))
            throw new HttpException('"userName"  is used before', HttpStatus.FORBIDDEN,);

        const salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = hash;
        if (createUserDto.type && createUserDto.type.toLowerCase() == "admin") createUserDto['role'] = "Instructor";
        return await this.UserRepository.createUser(createUserDto);
    }

    async updateUserRole(adminId: String, userName: String) {
        await this.UserRepository.changeUSerRole(userName, adminId);
    }

    async updateData(userId: String, updateData: {
        userName?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        oldPassword?: string;
        brithDay?: string;
    }) {
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(updateData.password, salt);
            updateData.password = hash;
        }
        return await this.UserRepository.updateUserData(userId, updateData);
    }

    async findByLogin(loginDto: LoginDto) {
        const user = await this.UserRepository.findByEmailORUserName(loginDto.identifier);
        if (!user)
            throw new HttpException('not user by this identifier', HttpStatus.FORBIDDEN);
        if (await bcrypt.compare(loginDto.password, user.password)) return user;
        throw new HttpException('password is not correct', HttpStatus.FORBIDDEN);

    }

    async findAllUsers(): Promise<User[] | null> {
        return await this.UserRepository.findAll();
    }

    async findLearnerUsers() {
        return await this.UserRepository.getUsersLearner();
    }


    async deleteUser(userID) {
        const user = await this.getUserByID(userID);
        if (!user)
            throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        await this.UserRepository.delete(userID);
    }

    async createCourse(userId, course: { description: string; name: string; syllabus?: [{ week_number: Number, title: String }]; }) {
        await this.UserRepository.checkUserIsInstructor(userId);
        var courseData: CreateDto = { description: course.description, name: course.name, instructor: userId, syllabus: course.syllabus };
        const createdcourse = await this.CourseRepository.createCourse(courseData);
        await this.UserRepository.addCourseToUser(userId, createdcourse._id);
        return createdcourse;
    }

    async getInstractorCourses(instructorId) {
        await this.UserRepository.checkUserIsInstructor(instructorId);
        const courses = await this.UserRepository.findSunset({ _id: instructorId }, { courses: 1, _id: 0 });
        var coursesWithData = [];
        if ((courses.courses) && (courses.courses != []))
            for (let i = 0; i < courses.courses.length; i++)
                coursesWithData.push(await this.CourseRepository.getCourse(courses.courses[i][0]));
        return coursesWithData;

    }

}