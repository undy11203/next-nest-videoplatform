import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, ObjectId, Types} from 'mongoose';
import * as mongoose from 'mongoose';
import {Role} from "./role.schemas";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({auto:true})
    _id: mongoose.Schema.Types.ObjectId

    @Prop({enique:true, required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default:false})
    banned: boolean;

    @Prop({default:"0"})
    banReasen: string;

    @Prop({type:Array})
    role: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
