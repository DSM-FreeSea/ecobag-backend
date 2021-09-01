import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
