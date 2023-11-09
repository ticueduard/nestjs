import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot({ isGlobal: true });
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService)
    {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const decodedToken = this.jwtService.decode(token);
        request.userId = decodedToken.sub;
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.SECRET,
                }
            );

            request['user'] = decodedToken;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}