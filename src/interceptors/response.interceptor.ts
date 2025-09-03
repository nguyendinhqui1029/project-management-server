import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseDto<T = unknown> {
  statusCode: number;
  data?: T;
}

@Injectable()
export class ResponseInterceptor<T = unknown> implements NestInterceptor<T, ResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data: T | null | undefined) => {
        if (data === null || data === undefined) {
          return { statusCode: 200 };
        }
        return {
          statusCode: 200,
          data,
        };
      }),
    );
  }
}
