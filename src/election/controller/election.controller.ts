import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ElectionService } from '../service/election.service';
import { CreateAspirantDto, GetAspirantDetails } from '../dto/election.dto';
import { ApiTags } from '@nestjs/swagger';
import { ImageUploadDto, SimpleDto } from '../../shared/simple.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file-upload';

@ApiTags('Election')
@Controller('election')
export class ElectionController {
  constructor(private electionService: ElectionService) {
  }

  @Post('/aspirant/photo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({ destination: './images/aspirants', filename: editFileName }), fileFilter: imageFileFilter,
    }),
  )
  async uploadImage(@UploadedFile() image): Promise<ImageUploadDto> {
    const response = {
      originalname: image.originalname,
      filename: image.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }

  @Post('/aspirant/data')
  async createAspirant(@Body() data: CreateAspirantDto): Promise<GetAspirantDetails> {
    return this.electionService.createAspirant(data);
  }

  @Get('/aspirants')
  getAllAspirants(): Promise<Array<GetAspirantDetails>> {
    return this.electionService.getAllAspirants();
  }

  @Get('/aspirant/:imagename')
  async getImage(@Param('imagename') image, @Res() res) {
    const response = await res.sendFile(image, { root: './images/aspirants' });
    // console.log(response);
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  @Patch('/update/:id')
  async updateAspirantInfo(@Param('id') id: string, @Body() data: CreateAspirantDto): Promise<GetAspirantDetails> {
    return this.electionService.updateAspirantInfo(data, id);
  }

  @Patch('/vote/:id')
  async voteForAspirant(@Param('id') id: string): Promise<SimpleDto> {
    return this.electionService.voteForAspirant(id);
  }

  @Get('/:id')
  async getAspirantById(@Param('id') id: string): Promise<GetAspirantDetails> {
    return await this.electionService.getAspirantById(id);
  }
}
