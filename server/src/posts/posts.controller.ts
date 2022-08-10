import {Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'video', maxCount: 1 },
        { name: 'image', maxCount: 1 },
    ]))
    createPost(
        @Body() dto: CreatePostDto,
        @UploadedFiles() files
    ) {
        const {video, image} = files
        return this.postService.create(dto, video, image)
    }
}
