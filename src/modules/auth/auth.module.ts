import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWtAuthGuard } from './guard/jwt-auth.guard';
import { JWtModule } from '../jwt/jwt.module';

@Module({
  imports: [JWtModule],
  controllers: [AuthController],
  providers: [AuthService, JWtAuthGuard],
  exports: [AuthService, JWtAuthGuard]

})
export class AuthModule { }
