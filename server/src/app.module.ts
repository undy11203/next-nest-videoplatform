import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve( __dirname, 'static'),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
