import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { getResponserOptions } from '../decorators/responser.decorator';
import * as TEXT from '../constants/text.constant';
import { CustomError } from 'src/errors/custom.error';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const target = context.getHandler();
    const { errorCode, errorMessage } = getResponserOptions(target);
    return next.handle().pipe(
      catchError((error) => {
        return throwError(
          () =>
            new CustomError(
              { message: errorMessage || TEXT.HTTP_DEFAULT_ERROR_TEXT, error },
              errorCode,
            ),
        );
      }),
    );
  }
}
