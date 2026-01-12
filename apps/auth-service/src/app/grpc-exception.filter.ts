import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Catch(HttpException)
export class GrpcExceptionFilter implements RpcExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): Observable<any> {
    const httpStatus = exception.getStatus();
    const response = exception.getResponse();
    const message = (response as any).message || exception.message;

    let rpcCode = status.UNKNOWN;

    // Map HTTP Status to gRPC Status
    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
        rpcCode = status.INVALID_ARGUMENT;
        break;
      case HttpStatus.UNAUTHORIZED:
        rpcCode = status.UNAUTHENTICATED;
        break;
      case HttpStatus.FORBIDDEN:
        rpcCode = status.PERMISSION_DENIED;
        break;
      case HttpStatus.NOT_FOUND:
        rpcCode = status.NOT_FOUND;
        break;
      case HttpStatus.CONFLICT:
        rpcCode = status.ALREADY_EXISTS;
        break;
      default:
        rpcCode = status.INTERNAL;
    }

    // Return gRPC compatible error
    return throwError(() => new RpcException({
      code: rpcCode,
      message: Array.isArray(message) ? message.join(', ') : message,
    }));
  }
}