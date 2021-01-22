import { ApiProperty } from '@nestjs/swagger';

export class SimpleDto {
  @ApiProperty()
  status: string;
}
