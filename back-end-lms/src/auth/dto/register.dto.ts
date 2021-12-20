import { IsEmail, IsString } from "class-validator";
export class RegisterDto {
  @IsString()
  userName: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  type: string;
  @IsString()
  brithDay: string;
}
