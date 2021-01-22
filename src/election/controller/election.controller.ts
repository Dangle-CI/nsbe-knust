import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ElectionService } from '../service/election.service';
import { CreateAspirantDto, GetAspirantDetails } from '../dto/election.dto';
import { ApiTags } from '@nestjs/swagger';
import { SimpleDto } from '../../shared/simple.dto';

@ApiTags('Election')
@Controller('election')
export class ElectionController {
  constructor(private electionService: ElectionService) {
  }

  @Post('/aspirant')
  async createAspirant(@Body() data: CreateAspirantDto): Promise<GetAspirantDetails> {
    return this.electionService.createAspirant(data);
    return;
  }

  @Get('/:id')
  async getAspirantById(@Param('id') id: string): Promise<GetAspirantDetails> {
    return await this.electionService.getAspirantById(id);
  }

  @Patch('/update/:id')
  async updateAspirantInfo(@Param('id') id: string, @Body() data: CreateAspirantDto): Promise<GetAspirantDetails> {
    return this.electionService.updateAspirantInfo(data, id);
  }

  @Patch('/vote/:id')
  async voteForAspirant(@Param('id') id: string): Promise<SimpleDto> {
    return this.electionService.voteForAspirant(id);
  }
}
