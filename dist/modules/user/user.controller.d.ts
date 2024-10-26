import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from '../../modules/user/user.model';
import { ChangeAvatarDTO, RegisterDto, UpdateUserDTO, ResetPasswordDTO } from './user.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    GetAllUsers(keyword?: string, limit?: number, skip?: number): Observable<User[]>;
    GetCurrentUser(user: User): User;
    Login(req: AuthenticatedRequest, res: Response): Observable<Response>;
    Register(registerDto: RegisterDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
    updateUser(id: string, requestBody: UpdateUserDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
    updateAvatarUser(id: string, body: ChangeAvatarDTO, currentUser: User): Promise<{
        username: string;
        photoUrl: string;
        email: string;
    }>;
    resetPassword(email: string): Promise<boolean>;
    setNewPassword(requestBody: ResetPasswordDTO): Promise<boolean>;
    deleteFeedbackById(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    }>;
}
