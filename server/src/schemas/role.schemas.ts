import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from "mongoose";

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop({auto:true})
    _id: mongoose.Schema.Types.ObjectId

    @Prop({enique:true, required: true})
    value: string;

    @Prop({required: false})
    description: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);
