import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { WorkspaceSettingModule } from './modules/workspace-setting/workspace-setting.module';
import { WorkspaceMemberModule } from './modules/workspace-member/workspace-member.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [AuthModule, UserModule,
    WorkspaceModule, WorkspaceSettingModule,
    WorkspaceMemberModule, TaskModule],
  providers: [PrismaService],
})
export class AppModule { }
