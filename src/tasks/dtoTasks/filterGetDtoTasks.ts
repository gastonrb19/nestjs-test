import { priority, status } from "../tasks.enums";
import { IsEnum, IsNotEmpty } from "class-validator";



export class FilterGetDtoTasks {
  @IsNotEmpty()
  @IsEnum(status)
  readonly status: status;

  @IsNotEmpty()
  @IsEnum(priority)
  readonly priority: priority;
}
