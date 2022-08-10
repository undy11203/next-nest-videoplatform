import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../schemas/user.schemas";
import {Model} from "mongoose";
import {Role, RoleDocument} from "../schemas/role.schemas";
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {
    }

    async createRole(dto:CreateRoleDto){
        const role = await this.roleModel.create({...dto})
        return role
    }

    async getRoleByValue(value:string){
        const role = await this.roleModel.find({value})
        return role
    }

}
