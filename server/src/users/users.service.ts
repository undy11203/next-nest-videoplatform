import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from "../schemas/user.schemas";
import {Model, ObjectId} from "mongoose";
import {Role, RoleDocument} from "../schemas/role.schemas";
import { CreateUserDto } from './dto/create-user.dto';
import {RolesService} from "../roles/roles.service";
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private roleService:RolesService,
    ) {}

    async createUser(dto: CreateUserDto):Promise<User>{
        const role = await this.roleService.getRoleByValue("USER")
        const user = await this.userModel.create({...dto, role})
        return user;
    }

    async getAllUsers():Promise<User[]>{
        const users = await this.userModel.aggregate([{$unwind:"$role"}])
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({email})
        return user;
    }
    //Need FIX
    async addRole(dto: AddRoleDto) {
        const user = await this.userModel.findById(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            // await user.role.push(role);
            await this.userModel.update(
                { _id: dto.userId },
                { $push: { role: {...role}[0] } }
            );
            await user.save()
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userModel.findById(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReasen = dto.banReason;
        await user.save();
        return user;
    }
}
