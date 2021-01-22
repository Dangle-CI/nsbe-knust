import { EntityRepository, Repository } from 'typeorm';
import { Election } from '../entity/election.entity';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@EntityRepository(Election)
export class ElectionRepository extends Repository<Election> {
  async createAspirant(data: Election): Promise<any> {
    try {
      await data.save();
      return data;
    } catch (e) {
      if (e.code === '23505' || 'ER_DUP_ENTRY') throw new ConflictException('Aspirant already exist');
      else throw new InternalServerErrorException();
    }
  }

  async getAspirantById(id: string): Promise<Election> {
    const aspirant = await this.find({ id });
    if (!aspirant) throw new NotFoundException(`Aspirant with ID: ${id} not found`);
    return aspirant[0];
  }

  async getAllAspirants(): Promise<Election[]> {
    const query = this.createQueryBuilder('election');
    const election = await query.getMany();
    return election;
  }
}
