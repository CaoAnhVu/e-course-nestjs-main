import { Strategy } from 'passport-local';
import { UserPrincipal } from '../../interfaces/user-principal.interface';
import { UserService } from '../../modules/user/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: UserService);
    validate(email: string, password: string): Promise<UserPrincipal>;
}
export {};
