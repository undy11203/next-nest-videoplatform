import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User, UserSchema} from "../schemas/user.schemas";
import {RolesModule} from "../roles/roles.module";
import {RolesService} from "../roles/roles.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(()=>AuthModule),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    RolesModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
