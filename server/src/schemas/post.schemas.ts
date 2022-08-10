import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {User} from "./user.schemas";


export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({auto:true})
    _id: mongoose.Schema.Types.ObjectId

    @Prop({enique:true, required: true})
    title: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    image: string;

    @Prop({required: true})
    video: string;

    @Prop()
    author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
