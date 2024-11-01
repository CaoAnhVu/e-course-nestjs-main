import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  EMPTY,
  Observable,
  find,
  firstValueFrom,
  from,
  map,
  mergeMap,
  of,
  throwIfEmpty,
} from 'rxjs';
import {
  FORGOT_PASSWORD_MODEL,
  USER_MODEL,
} from '../../processors/database/database.constants';
import { User, UserModel } from '../../modules/user/user.model';
import {
  ChangeAvatarDTO,
  RegisterDto,
  ResetPasswordDTO,
  UpdateUserDTO,
} from './user.dto';
import { RoleType } from '../../shared/enum/role.type.enum';
import { UserPrincipal } from '../../interfaces/user-principal.interface';
import { Permission } from '../../helper/checkPermission.helper';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../interfaces/jwt.interface';
import { TokenResult } from '../../interfaces/auth.interface';
import {
  RESOURCE_TYPE_IMAGE,
  USER_AVATAR,
} from '../../constants/cloudinary.constants';
import { CloudinaryService } from '../../processors/helper/helper.service.cloudinary';
import { ForgotPassword, ForgotPasswordModel } from './forgot.password.model';
import { EmailService } from '../../processors/helper/helper.service.email';
import { hash } from 'bcrypt';
import * as APP_CONFIG from '../../app.config';
import mongoose from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL) private userModel: UserModel,
    @Inject(FORGOT_PASSWORD_MODEL) private forgotPwModel: ForgotPasswordModel,
    private jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly emailService: EmailService,
  ) {}

  findByEmail(email: string): Observable<User | undefined> {
    return from(this.userModel.findOne({ email: email }).exec());
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('-password');
  }

  exitsByEmail(email: string): Observable<boolean> {
    return from(this.userModel.exists({ email }).exec()).pipe(
      map((exits) => exits != null),
    );
  }

  async register(data: RegisterDto) {
    const existingUser = await this.userModel.findOne({ email: data.email });
    if (existingUser) {
      throw new BadRequestException('Email was exitsed');
    }
    const created = await this.userModel.create({
      ...data,
      roles: [RoleType.USER],
    });
    return created;
  }

  login(user: UserPrincipal): Observable<TokenResult> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      photoUrl: user.photoUrl,
      roles: user.roles,
    };
    return from(this.jwtService.signAsync(payload)).pipe(
      map((access_token) => {
        return { access_token };
      }),
    );
  }

  validateUser(email: string, pass: string): Observable<UserPrincipal> {
    return this.findByEmail(email).pipe(
      mergeMap((p) => (p ? of(p) : EMPTY)),
      throwIfEmpty(
        () => new UnauthorizedException(`email: ${email} was not found`),
      ),

      mergeMap((user) => {
        const { _id, password, username, email, roles } = user;
        return user.comparePassword(pass).pipe(
          map((m) => {
            if (m) {
              return { id: _id, username, email, roles } as UserPrincipal;
            } else {
              throw new UnauthorizedException(
                'email or password is not matched',
              );
            }
          }),
        );
      }),
    );
  }

  passwordTokenRandom() {
    return (Math.floor(Math.random() * 9000000) + 1000000).toString();
  }

  async sendEmailForgotPassword(email: string): Promise<boolean> {
    try {
      var user = await this.userModel.findOne({ email: email });
      if (!user) {
        throw new HttpException(
          `Forgot password: user not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      var tokenModel = await this.createForgotPasswordToken(email);

      if (tokenModel && tokenModel.newPasswordToken) {
        const content = `
        <p>Hello,</p>
        <p>We received a request to reset your password. Please use the following token to reset your password:</p>
        <p><strong>${tokenModel.newPasswordToken}</strong></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Thank you,</p>
        <p>Company Team</p>
        `;

        this.emailService.sendMailAs(APP_CONFIG.APP.NAME, {
          to: email,
          subject: 'Forgotten Password',
          text: 'hehe',
          html: content,
        });
        return true;
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException(`${err.message}`);
    }
  }

  async createForgotPasswordToken(email: string): Promise<ForgotPassword> {
    var forgottenPasswordModel = await this.forgotPwModel.findOneAndUpdate(
      { email: email },
      {
        email: email,
        newPasswordToken: this.passwordTokenRandom(),
        timestamp: new Date(),
      },
      {
        upsert: true,
        new: true,
      },
    );
    return forgottenPasswordModel;
  }

  async changedPassword(body: ResetPasswordDTO) {
    try {
      if (body.newPassword.length < 8) {
        throw new BadRequestException(`The min length of password is 8`);
      }
      if (body.newPasswordToken) {
        var forgottenPassworldModel = await this.getForgottenPasswordModel(
          body.email,
          body.newPasswordToken,
        );
        if (!forgottenPassworldModel) {
          throw new BadRequestException(`Password token or email is wrong`);
        }
        const findOneUser = await this.userModel.findOne({ email: body.email });

        const hashedPassword = await hash(body.newPassword, 12);

        findOneUser.set('password', hashedPassword);
        await this.userModel.findByIdAndUpdate(findOneUser.id, findOneUser);
        await forgottenPassworldModel.deleteOne();
        return true;
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException(`${err.message}`);
    }
  }

  async getForgottenPasswordModel(
    email: string,
    newPasswordToken: string,
  ): Promise<ForgotPassword> {
    return await this.forgotPwModel.findOne({
      email: email,
      newPasswordToken: newPasswordToken,
    });
  }

  findAll(keyword?: string, skip = 0, limit = 10): Observable<User[]> {
    if (keyword && keyword.trim() === '') {
      throw new BadRequestException('Do not enter spaces.');
    }
    if (keyword) {
      return from(
        this.userModel
          .find({ username: { $regex: keyword, $options: 'i' } })
          .select('-password')
          .skip(skip)
          .limit(limit)
          .exec(),
      );
    } else {
      return from(
        this.userModel
          .find({})
          .select('-password -__v')
          .skip(skip)
          .limit(limit)
          .exec(),
      );
    }
  }

  async changedAvatar(
    id: string,
    requestBody: ChangeAvatarDTO,
    currentUser: User,
  ) {
    const fileImage = requestBody.file; // 1
    try {
      let user = await this.userModel.findById(id); // 2
      if (!user) {
        //3
        throw new NotFoundException('User does not exist'); // 4
      }
      Permission.check(id, currentUser); // 5
      if (user.photoPublicId) {
        // 6
        this.cloudinaryService.destroyFile(user.photoPublicId); // 7
      }

      const imageUpload = await this.cloudinaryService.uploadFile(
        fileImage,
        USER_AVATAR,
        id,
        RESOURCE_TYPE_IMAGE,
      ); // 8
      user.photoPublicId = imageUpload.public_id; // 9
      user.photoUrl = imageUpload.url; // 9

      await this.userModel.findByIdAndUpdate(id, user); // 9
      const getUser = await this.userModel.findById(id); // 9

      return {
        username: getUser.username,
        photoUrl: getUser.photoUrl,
        email: getUser.email,
      }; // 10
    } catch (err) {
      console.log('Faill error: ${err}'); // 11
      throw new BadRequestException('Failed to upload image: ${err}'); // 11
    }
  }

  async updateById(id: string, requestBody: UpdateUserDTO, currentUser: User) {
    if (requestBody.roles) {
      throw new BadRequestException('You cannot change role');
    }

    let user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    if (user.email != requestBody.email && requestBody.email != null) {
      const userByEmail = await this.userModel.findOne({
        email: requestBody.email,
      });
      if (userByEmail) {
        throw new BadRequestException('Email already exist');
      }
    }

    if (requestBody.password) {
      await firstValueFrom(
        user.comparePassword(requestBody.password).pipe(
          mergeMap(async (isMatch) => {
            if (isMatch) {
              requestBody.password = await hash(requestBody.newPassword, 12);
              return true;
            } else {
              throw new UnauthorizedException('Password is not matched');
            }
          }),
        ),
      );
    }

    Permission.check(id, currentUser);

    user.set(requestBody);

    const updatedUser = await this.userModel.findByIdAndUpdate(id, user);

    return {
      username: updatedUser.username,
      photoUrl: updatedUser.photoUrl,
      email: updatedUser.email,
    };
  }

  async lockById(id: string) {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    const value = await this.userModel.findById(id);
    if (value.roles.includes(RoleType.ADMIN)) {
      throw new BadRequestException("Can't lock ADMIN.");
    }
    return this.softRemove(value);
  }

  async softRemove(value: User) {
    if (value.lockAt != null) {
      value.lockAt = null;
    } else {
      value.lockAt = new Date();
    }
    const deleted = await this.userModel
      .findByIdAndUpdate(value.id, value)
      .setOptions({ overwrite: true, new: true });

    return deleted;
  }
}
