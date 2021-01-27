import { ApiProperty } from '@nestjs/swagger';

export class SimpleDto {
  @ApiProperty()
  status: string;
}

export class ImageUploadDto {
  status: any;
  message: string;
  data: {
    originalname: string;
    filename: string;
  };
}
