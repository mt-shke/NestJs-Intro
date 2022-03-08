import { ForbiddenException, Injectable } from '@nestjs/common';
import { IAuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  signup = async (dto: IAuthDto) => {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);

      // save the new user in db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
        // Two ways to return user data if needed:  1) select only required fields
        // select: {
        //   id: true,
        //   email: true,
        //   createdAt:true
        // }
      });
      // 2) delete unrequired fields
      // delete user.hash

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  };

  signin = async (dto: IAuthDto) => {
    try {
      // find the user by email
      // if user does not exist throw exception
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) throw new ForbiddenException('Credentials incorrect');

      // compare password
      // if password incorrect throw exception
      const pwMatches = await argon.verify(user.hash, dto.password);
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

      // delete user.hash;
      // return user

      return this.signToken(user.id, dto.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('Credentials incorrect');
      }
      throw error;
    }
  };

  signToken = async (
    userId: Number,
    email: String,
  ): Promise<{ access_token: string }> => {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  };
}
