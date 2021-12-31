import { User } from "../models/user.schema";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { ModelType } from 'typegoose';
import { InjectModel } from "nestjs-typegoose";
import { BaseRepository } from "../shared/repository/base.service";
import * as bcrypt from 'bcrypt';
import { UpdatDto } from './dto/update.dto';
import { identity } from "rxjs";

const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UserRepository extends BaseRepository<User>  {
    constructor(
        @InjectModel(User) private readonly _userModel: ModelType<User>
    ) {
        super();
        this._Model = _userModel;
    }

    async findByEmailORUserName(identifier: string) {
        return await this.findOne({ $or: [{ email: identifier }, { userName: identifier }] });
    }
    async findByUserName(userName: string) {
        return await this.findOne({ userName: userName });
    }

    async createUser(userData: RegisterDto) {
        return await this.create(userData);
    }

    async changeUSerRole(userName, adminId) {
        const admin = await this.findByID(adminId);
        if (!admin || admin.type != "admin") throw new HttpException('this task can be done only be admins', HttpStatus.UNAUTHORIZED);
        const user = await this.findByEmailORUserName(userName);
        if (user && (user.role && user.role == "Learner") || !user.role) await this.update(user.id, { role: "Instructor" })
        else throw new HttpException('user is instrucror', HttpStatus.BAD_REQUEST);
    }

    async updateUserData(id: any, updateInfo: UpdatDto): Promise<boolean> {
        const user = await this.findByID(id);
        if (updateInfo.userName && updateInfo.userName != user.userName)
            if (updateInfo.userName && await this.findByUserName(updateInfo.userName)) throw new HttpException('This userName exists', HttpStatus.BAD_REQUEST);
        if (updateInfo.password && !updateInfo.oldPassword) throw new HttpException('To update password should enter password', HttpStatus.BAD_REQUEST);
        if (! await bcrypt.compare(updateInfo.oldPassword, user.password)) throw new HttpException('old password is not correct', HttpStatus.FORBIDDEN);
        return await this.update(id, updateInfo)
    }

    async addCourseToUser(userId, courseId) {
        console.log(courseId)
        if (!await this.updateByData({ _id: userId, role: "Instructor" }, { $push: { courses: courseId } }))
            throw new HttpException('You should be instructor', HttpStatus.FORBIDDEN);
    }

    async checkUserIsInstructor(userId) {
        const users = await this.find({ _id: userId, role: "Instructor" });
        console.log(users[0].courses)
        if (!users || users == [] || users.length == 0)
            throw new HttpException('You should be instructor', HttpStatus.FORBIDDEN);
    }

    async getUserById(userId) {
        const user = await this.findByID(userId);
        if (!user)
            throw new HttpException('Not user', HttpStatus.BAD_REQUEST);
        return user;
    }

    async getUsersLearner() {
        return await this.find({ role: "Learner" })
    }


}