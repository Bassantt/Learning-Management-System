import { Controller, UseGuards, Get, Put, Request, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from "../models/user.schema";
import { UpdatDto } from './dto/update.dto';


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
    async updateMyData(@Request() req, @Body() updateData: UpdatDto) {
        await this.userService.updateData(req.user._id, updateData)
    }
    

    @Get('/users')
    async all(): Promise<User[] | null> {
        return await this.userService.findAllUsers();
    }

}
