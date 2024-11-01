import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiFile } from '../../decorators/api.file.decorator';
import { RoleType } from '../../shared/enum/role.type.enum';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: 'The min length of password is 8' })
  readonly password: string;
}

export class UserDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty({ type: RoleType, isArray: true, required: false }) // For optional properties
  readonly roles?: RoleType[];
}

export class UpdateUserDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8, { message: 'The min length of password is 8' })
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(8, { message: 'The min length of password is 8' })
  newPassword?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  readonly photoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly roles?: RoleType[];

  @ApiProperty({ required: false })
  @IsOptional()
  readonly courses?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly favouritesCourses?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly favouritesExams?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly finishedExams?: string;
}

export class ChangeAvatarDTO {
  @IsNotEmpty()
  @IsOptional()
  @ApiFile()
  file: Express.Multer.File;
}

export class ResetPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPasswordToken: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;
}

export class ChangePasswordDTO {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly oldPw: string;

  @ApiProperty()
  readonly newPw: string;
}
