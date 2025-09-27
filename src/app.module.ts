import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { WorkspaceSettingModule } from './modules/workspace-setting/workspace-setting.module';
import { WorkspaceMemberModule } from './modules/workspace-member/workspace-member.module';
import { TaskModule } from './modules/task/task.module';
import { SubTaskModule } from './modules/sub-task/sub-task.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagModule } from './modules/tag/tag.module';
import { TaskDependencyModule } from './modules/task-dependency/task-dependency.module';
import { RecurringModule } from './modules/recurring/recurring.module';
import { NoteModule } from './modules/note/note.module';
import { ActivityLogModule } from './modules/activity-log/activity-log.module';

@Module({
  imports: [
    PrismaModule, AuthModule,
    UserModule, WorkspaceModule, WorkspaceSettingModule,
    WorkspaceMemberModule, TaskModule, SubTaskModule,
    TagModule, TaskDependencyModule, RecurringModule, NoteModule,
    ActivityLogModule
  ],
  providers: [PrismaService],
})
export class AppModule { }
