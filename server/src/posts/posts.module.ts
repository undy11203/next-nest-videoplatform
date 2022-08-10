import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { Post, PostSchema } from 'src/schemas/post.schemas';
import {PostsService} from "./posts.service";
import {FilesModule} from "../files/files.module";

@Module({
  imports:[
    MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
    FilesModule,
  ],
  controllers: [PostsController],
  providers:[PostsService]
})
export class PostsModule {}
