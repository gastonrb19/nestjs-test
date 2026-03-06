import {priority} from "../tasks.enums";
import { IsNotEmpty } from "class-validator";

export class UpdateDtoTask {
    @IsNotEmpty()     
    readonly title? : string;
    readonly description? : string;
    readonly priority? : priority;
}
