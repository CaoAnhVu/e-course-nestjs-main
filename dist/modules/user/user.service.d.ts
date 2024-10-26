import { Observable } from 'rxjs';
import { User, UserModel } from '../../modules/user/user.model';
import { ChangeAvatarDTO, RegisterDto, ResetPasswordDTO, UpdateUserDTO } from './user.dto';
import { UserPrincipal } from '../../interfaces/user-principal.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenResult } from '../../interfaces/auth.interface';
import { CloudinaryService } from '../../processors/helper/helper.service.clouldinary';
import { ForgotPassword, ForgotPasswordModel } from './forgot.password.model';
import { EmailService } from '../../processors/helper/helper.service.email';
import mongoose from 'mongoose';
export declare class UserService {
    private userModel;
    private forgotPwModel;
    private jwtService;
    private readonly cloudinaryService;
    private readonly emailService;
    constructor(userModel: UserModel, forgotPwModel: ForgotPasswordModel, jwtService: JwtService, cloudinaryService: CloudinaryService, emailService: EmailService);
    findByEmail(email: string): Observable<User | undefined>;
    findOneByEmail(email: string): Promise<User>;
    exitsByEmail(email: string): Observable<boolean>;
    register(data: RegisterDto): Promise<mongoose.Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    login(user: UserPrincipal): Observable<TokenResult>;
    validateUser(email: string, pass: string): Observable<UserPrincipal>;
    passwordTokenRandom(): string;
    sendEmailForgotPassword(email: string): Promise<boolean>;
    createForgotPasswordToken(email: string): Promise<ForgotPassword>;
    changedPassword(body: ResetPasswordDTO): Promise<boolean>;
    getForgottenPasswordModel(email: string, newPasswordToken: string): Promise<ForgotPassword>;
    findAll(keyword?: string, skip?: number, limit?: number): Observable<User[]>;
    changedAvatar(id: string, requestBody: ChangeAvatarDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
    updateById(id: string, requestBody: UpdateUserDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
    lockById(id: string): Promise<mongoose.Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    softRemove(value: User): Promise<mongoose.Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
