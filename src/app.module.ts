import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { WorkspaceSettingModule } from './modules/workspace-setting/workspace-setting.module';

@Module({
  imports: [AuthModule, UserModule, 
    WorkspaceModule, WorkspaceSettingModule],
  providers: [PrismaService],
})
export class AppModule {}
