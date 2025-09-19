import { Module } from "@nestjs/common";
import { WorkspaceMemberController } from "./workspace-member.controller";
import { WorkspaceMemberServie } from "./workspace-member.service";

@Module({
  controllers: [WorkspaceMemberController],
  providers: [WorkspaceMemberServie],
  exports: [WorkspaceMemberServie]

})
export class WorkspaceMemberModule { }
