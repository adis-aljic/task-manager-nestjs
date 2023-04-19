import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.model";


export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowStatutes = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ]

    transform(value: any, metadata: ArgumentMetadata) {
    
        value = value.toUpperCase()
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is invalid status`)
        }
        return value
    }

    private isStatusValid(status : any){
     const idx =   this.allowStatutes.indexOf(status)
     return idx !== -1

    }
}
