import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Agar Error gRPC se aaya hai (RpcException or Error Object)
    if (exception.code || exception.details) {
      // 2 = UNKNOWN (Jo abhi aa raha hai)
      // Hum message padh kar status decide kar sakte hain ya mapping bana sakte hain
      message = exception.details || exception.message;

      if (message === 'Invalid email or password' || exception.code === 16) { // 16 = UNAUTHENTICATED
         status = HttpStatus.UNAUTHORIZED;
      } else if (exception.code === 5) { // 5 = NOT_FOUND
         status = HttpStatus.NOT_FOUND;
      } else if (exception.code === 6) { // 6 = ALREADY_EXISTS
         status = HttpStatus.CONFLICT;
      } else {
         // Agar code 2 (UNKNOWN) hai lekin message clear hai
         status = HttpStatus.BAD_REQUEST;
      }
    } 
    // Agar Error normal HTTP Exception hai
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    Logger.error(`Gateway Error: ${message}`, exception.stack);

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
    });
  }
}