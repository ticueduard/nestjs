import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findUsername(username);
console.log(user);
        if (!user) {
            throw new UnauthorizedException('User not found.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Incorrect password.');
        }

        const { ...result } = user;

        const payload = { sub: user.id, username: user.username };
        const accessToken = await this.jwtService.signAsync(payload);

        return {access_token: accessToken};
    }



}
