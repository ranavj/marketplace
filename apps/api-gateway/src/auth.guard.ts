import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

// Interface for Validate Response
interface ValidateResponse {
  valid: boolean;
  userId: string;
}

interface AuthServiceClient {
  validate(data: { token: string }): any;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private authService: AuthServiceClient;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>('AuthService');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // 1. Header se Token nikalo: "Bearer eyJhb..."
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1]; // "Bearer" hataya
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      // 2. Auth Service ko gRPC call karo
      const response: ValidateResponse = await firstValueFrom(
        this.authService.validate({ token })
      );

      // 3. Agar Valid nahi hai, toh bhaga do
      if (!response.valid) {
        throw new UnauthorizedException('Invalid Token');
      }

      // 4. Valid hai! User ID ko request object mein chipka do
      // (Taaki Controller ko pata chale kaun product bana raha hai)
      request.user = { id: response.userId };
      
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}