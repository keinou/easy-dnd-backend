import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { OAuth2Client } from 'google-auth-library';
import { Model } from 'mongoose';
import { jwtOptions } from './constants';
import { UserLoginDto } from './dto/auth.login.dto';
import { AuthStategy, User, UserDocument } from './entities/auth.entity';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService) { }

  async authenticate(userLogin: UserLoginDto) {
    if (userLogin.token) {
      return this.googleAuth(userLogin.token);
    } else {
      return this.localAuth(userLogin.email, userLogin.password);
    }
  }

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email }).select('-password').select('-__v');
    return user;
  }

  async localAuth(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });

    if (user) {
      const saltOrRounds = 10;
      const password = pass;
      const hash = await bcrypt.hash(password, saltOrRounds);

      if (await bcrypt.compare(user.password, hash)) {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }

    return await this.login({ email, image: null, name: null, strategy: null });
  }

  async googleAuth(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket.getPayload(), 'ticket');

    const { email, name, picture } = ticket.getPayload();
    const data = await this.login({ email, name, image: picture, strategy: AuthStategy.GOOGLE });
    return {
      data,
      message: 'success',
    };
  }

  async login({
    email,
    name,
    image,
    strategy
  }: {
    email: string;
    name: string;
    image: string;
    strategy: AuthStategy;
  }): Promise<any> {
    const now = new Date();
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      const newUser = new this.userModel({ email, name, image, now, strategy });
      await newUser.save();

    } else {
      console.log(user);
      user.lastLoginAt = now;
      await user.save();
    }

    const payload = { username: user.email, sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload, jwtOptions),
    };
  }

  async create(newUser: User) {
    let findUser = await this.userModel.findOne({ email: newUser.email });
    if (findUser) {
      throw new BadRequestException();
    }

    const user = new User();

    const saltOrRounds = 10;
    const password = newUser.password ?? 'changeme';
    const hash = await bcrypt.hash(password, saltOrRounds);

    user.name = newUser.name;
    user.email = newUser.email;
    user.password = hash;
    user.stategy = AuthStategy.LOCAL;
    user.createdAt = new Date();

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const dbUser = new this.userModel(user);
    await dbUser.save();

    return dbUser;
  }
}
