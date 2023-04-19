import { TaskStatus } from "../tasks.model";
import {IsOptional, IsIn, IsNotEmpty} from "class-validator"

export class getTaskFilterDTO {
@IsOptional()
@IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
status : TaskStatus;

@IsOptional()
@IsNotEmpty()
search : string


}