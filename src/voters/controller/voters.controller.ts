import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { VotersService } from '../service/voters.service';
import { VoterDetails } from '../dto/voters.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateAspirantDto, GetAspirantDetails } from '../../election/dto/election.dto';
import { SimpleDto } from '../../shared/simple.dto';

@ApiTags('Voters')
@Controller('voters')
export class VotersController {
  constructor(private votersService: VotersService) {
  }

  @Post()
  createVoter(@Body() voter: any): Promise<VoterDetails> {
    return this.votersService.createVoter(voter);
  }

  @Patch(':id')
  updateVoteStatus(@Body() aspirants: Array<GetAspirantDetails>, @Param('id', ParseIntPipe) id: number): Promise<SimpleDto> {
    return this.votersService.updateVoterStatus(id, aspirants);
  }
}
