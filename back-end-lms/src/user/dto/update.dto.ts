import { Length, IsEmail, IsString, IsOptional } from "class-validator";
export class UpdatDto {
  @IsString()
  userName?: string;
  @IsString()
  password?: string;
  @IsString()
  firstName?: string;
  @IsString()
  lastName?: string;
  @IsString()
  oldPassword?: string;
  @IsString()
  brithDay?: string;
}

