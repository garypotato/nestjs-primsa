import { Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import {Request} from 'express'
import { TUserInReq } from 'type';
import { GetUser } from 'src/decorators/getUser.decorator';

interface IFileReq extends Request {
    user: TUserInReq
}

@Controller('upload')
export class FileUploadController {
    @Post('/avatar')
    @UseInterceptors(FileInterceptor('file', {
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './public/avatar')
            },
            filename: (req: IFileReq, file, cb) => {
                cb(null, `${req.user.id}-${req.user.email}.png`)
            }
        })
    }))
    uploadFile(@UploadedFile() file:Express.Multer.File){
        return "file"
    }

    @Get('/avatar')
    serveAvatar(@Res() res, @GetUser('user') user: TUserInReq) {
        return res.sendFile(`${user.id}-${user.email}.png`, {root: 'public/avatar'})
    }
}
