import {
  Body,
  ConflictException,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ParseObjectIdPipe } from '../../shared/pipe/parse.object.id.pipe';
import { Observable, map, mergeMap } from 'rxjs';
import { User } from '../../modules/user/user.model';
import {
  ChangeAvatarDTO,
  RegisterDto,
  UpdateUserDTO,
  ResetPasswordDTO,
} from './user.dto';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/authenticated.request.interface';
import { LocalAuthGuard } from '../../auth/guard/local-auth.guard';
import { GetUser } from '../../decorators/current.user.decorator';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { RoleType } from '../../shared/enum/role.type.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileToBodyInterceptor } from '../../decorators/api.file.decorator';
import { Responser } from '../../decorators/responser.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller({ path: '/users' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN)
  GetAllUsers(
    @Query('q') keyword?: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
  ): Observable<User[]> {
    return this.userService.findAll(keyword, skip, limit);
  }

  @Get('/current')
  @Responser.handle('Get current user')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  GetCurrentUser(@GetUser() user: User) {
    return user;
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiProperty()
  Login(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ): Observable<Response> {
    console.log(process.env.JWT_SECRET_KEY);
    console.log(process.env.JWT_EXPIRES_IN);
    return this.userService.login(req.user).pipe(
      map((token) => {
        return res
          .header('Authorization', 'Bearer ' + token.access_token)
          .json(token)
          .send();
      }),
    );
  }

  @Post('/register')
  Register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  updateUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() requestBody: UpdateUserDTO,
    @GetUser() currentUser: User,
  ) {
    return this.userService.updateById(id, requestBody, currentUser);
  }

  @Put('/avatar/:id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN, RoleType.USER, RoleType.TEACHER)
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  updateAvatarUser(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: ChangeAvatarDTO,
    @GetUser() currentUser: User,
  ) {
    return this.userService.changedAvatar(id, body, currentUser);
  }

  @Post('/forgot-password/:email')
  resetPassword(@Param('email') email: string) {
    return this.userService.sendEmailForgotPassword(email);
  }

  @Post('/reset-password')
  setNewPassword(@Body() requestBody: ResetPasswordDTO) {
    return this.userService.changedPassword(requestBody);
  }

  @Delete('/lock/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @HasRoles(RoleType.ADMIN)
  deleteFeedbackById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.userService.lockById(id);
  }
}
