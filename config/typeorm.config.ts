import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Auth} from '../src/auth/entity/auth.entity';
import { Members } from '../src/members/entity/members.entity';
import { Election } from '../src/election/entity/election.entity';
import { Voters } from '../src/voters/entity/voters.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'nsbe',
    synchronize: true,
    entities: [Auth, Members, Election, Voters],
    // url: process.env.DATABASE_URL,
    // host: process.env.DATABASE_HOST,
    // database: process.env.DATABASE_NAME,
    // username: process.env.DATABASE_USER,
    // password: process.env.DATABASE_PW
};
