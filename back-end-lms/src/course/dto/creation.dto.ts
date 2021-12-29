import { IsString } from "class-validator";

export class CreateDto {
  @IsString()
  description: string;
  @IsString()
  name: string;
  @IsString()
  instructor: any;
  syllabus?: [{ week_number: Number, title: String }];
}

