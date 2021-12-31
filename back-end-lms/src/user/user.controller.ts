import { Controller, UseGuards, Get, Put, Request, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from "../models/user.schema";


@Controller('')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async me(@Request() req) {
        const user = await this.userService.getUserByID(req.user._id);
        user.password = undefined;
        return { user };
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/user/:userName')
    async changeUserRole(@Request() req, @Param() params) {
        await this.userService.updateUserRole(req.user._id, params.userName)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/me')
    async updateMyData(@Request() req, @Body() updateData: {
        userName?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        oldPassword?: string;
        brithDay?: string;
    }) {

        await this.userService.updateData(req.user._id, updateData)
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

    @Get('/users')
    async all(): Promise<User[] | null> {
        return await this.userService.findAllUsers();
    }

    @Get('/users/learner')
    async allLearner(): Promise<User[] | null> {
        return await this.userService.findLearnerUsers();
    }



}
