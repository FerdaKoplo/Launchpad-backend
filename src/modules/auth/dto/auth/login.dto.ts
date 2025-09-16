import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDTO {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}
