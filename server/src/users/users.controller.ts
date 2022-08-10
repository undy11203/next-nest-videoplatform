import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import {UsersService} from "./users.service";
import {AddRoleDto} from "./dto/add-role.dto";
import { BanUserDto } from './dto/ban-user.dto';

@Controller('/users')
export class UsersController {
    constructor(private userService: UsersService) {    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }
}
