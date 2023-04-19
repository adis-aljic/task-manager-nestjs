import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { getTaskFilterDTO } from './DTO/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {};
    @Get()
    getTasks(@Query() filterDto : getTaskFilterDTO ): Task[] {
        if(Object.keys(filterDto).length){
            return this.taskService.getFilteredTask(filterDto)
        }
        else{

            
            return this.taskService.getAllTasks() 
        }
    }
    
    
    @Get("/:id")
    getTaskById(@Param("id") id: string) : Task{
        return this.taskService.getTaskByID(id)
    }
  
    @Delete("/:id")
    deleteTaskById(@Param("id") id: string) : void{
         this.taskService.deleteTaskById(id)
    }

    @Patch("/:id/status")
    updateStatusTaskById(@Param("id") id: string, @Body("status", TaskStatusValidationPipe) status: TaskStatus) {
       return  this.taskService.updateStatusTaskById(id , status)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDTO: CreateTaskDTO): Task{
        
       return this.taskService.createTask(createTaskDTO)
        
    }


}
