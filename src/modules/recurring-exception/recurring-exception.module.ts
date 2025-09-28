import { Module } from "@nestjs/common";
import { RecurringExceptionController } from "./recurring-exception.controller";
import { RecurringExceptionService } from "./recurring-exception.service";


@Module({
  controllers: [RecurringExceptionController],
  providers: [RecurringExceptionService],
  exports: [RecurringExceptionService]
})

export class RecurringExceptionModule { }
