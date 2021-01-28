import { HttpException, Injectable, InternalServerErrorException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElectionRepository } from '../repository/election.repository';
import { MembersService } from '../../members/service/members.service';
import { CreateAspirantDto, GetAspirantDetails } from '../dto/election.dto';
import { Election } from '../entity/election.entity';
import { SimpleDto } from '../../shared/simple.dto';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

// const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const AWS_S3_BUCKET_NAME = 'nsbe';
const s3 = new AWS.S3();
AWS.config.update({
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessKeyId: 'AKIAYMPQM67KSEL7O7UJ',
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  secretAccessKey: '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',
});


@Injectable()
export class ElectionService {
  constructor(@InjectRepository(ElectionRepository) private electionRepository: ElectionRepository, private membersService: MembersService) {
  }

  async getAspirantDetails(id: string): Promise<any> {
    return await this.membersService.getMembersByMemberId(id);
  }

  async getAspirantById(id: string): Promise<GetAspirantDetails> {
    const aspirant: any = await this.electionRepository.getAspirantById(id);
    aspirant['memberDetails'] = await this.getAspirantDetails(aspirant.memberId);
    return aspirant;
  }

  async createAspirant(data: CreateAspirantDto): Promise<GetAspirantDetails> {
    const isMember = await this.getAspirantDetails(data.memberId);
    if (!isMember) throw new HttpException('Aspirant Not a Member', 409);
    const aspirant = new Election();
    aspirant.image = data.image;
    aspirant.memberId = data.memberId;
    aspirant.position = data.position;
    aspirant.votes = 0;
    return this.electionRepository.createAspirant(aspirant);
  }

  async updateAspirantInfo(data: CreateAspirantDto, id: string): Promise<GetAspirantDetails> {
    const aspirant = await this.electionRepository.getAspirantById(id);
    aspirant.image = data.image;
    aspirant.memberId = data.memberId;
    aspirant.position = data.position;
    try {
      await aspirant.save();
      return this.getAspirantById(aspirant.id);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async voteForAspirant(id: string): Promise<SimpleDto> {
    const aspirant = await this.electionRepository.getAspirantById(id);
    console.log(aspirant);
    aspirant.votes += 1;
    try {
      await aspirant.save();
      return { status: 'Voted' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getAllAspirants(): Promise<Array<GetAspirantDetails>> {
    const aspirants: any = await this.electionRepository.getAllAspirants();
    if (aspirants.length) {
      for (let aspirant of aspirants) {
        const memberDetails = await this.getAspirantDetails(aspirant.memberId);
        aspirant.memberDetails = memberDetails
        // aspirant = Object.assign(aspirant, memberDetails);
      }
    }
    return aspirants;
  }

  async fileUpload(@Req() req, @Res() res?) {
    try {
      this.upload(req, res, function(error) {
        if (error) {
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function(request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 1);

}
