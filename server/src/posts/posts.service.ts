import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post, PostDocument } from 'src/schemas/post.schemas';
import { CreatePostDto } from './dto/create-post.dto';
import {FilesService, FileType} from "../files/files.service";
import {User, UserDocument} from "../schemas/user.schemas";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        private filesService: FilesService
    ) {}

    async create(dto: CreatePostDto, video: any, image:any) {
        const videoPath = this.filesService.createFile(FileType.VIDEO, video[0]);
        const imagePath = this.filesService.createFile(FileType.IMAGE, image[0]);
        const post = await this.postModel.create({...dto, image: imagePath, video:videoPath})
        return post;
    }
}
