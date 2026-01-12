import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // Bcrypt import
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUser(data: CreateUserDto) {
    // 1. Check karein user pehle se exist karta hai kya
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 2. Password ko Hash karein (Salt rounds: 10)
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. User save karein (Hashed password ke sath)
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, // Replace plain text with hash
      },
    });

    // 4. Password return na karein response mein (Security Practice)
    const { password, ...result } = user;
    return result;
  }

  async login(data: LoginDto) {
    // 1. User dhoondhein
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    // 2. Agar user nahi mila
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Password Match karein (Bcrypt compare)
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 4. Token Payload banayein (Token ke andar kya data chhupana hai)
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    // 5. Token return karein
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    };
  }

  async getUsers() {
    return this.prisma.user.findMany({
      // Select specific fields (password kabhi return nahi karna chahiye)
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true
      }
    });
  }
}