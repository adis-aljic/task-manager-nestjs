import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { uuid } from 'uuidv4';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { getTaskFilterDTO } from './DTO/get-task-filter.dto';
@Injectable()
export class TasksService {

private tasks : Task[] = []

getAllTasks(){
    return this.tasks;
}

getTaskByID(id : string) : Task{
    const found = this.tasks.find(task => task.id === id)
    if(!found) {
        throw new NotFoundException("Task with ID not found")
    }
    else{

    }
    return found 
}

deleteTaskById(id:string) {
    const found = this.getTaskByID(id)
    console.log(found, "aa");
    
     this.tasks = this.tasks.filter(task => task.id !== found.id)
}

updateStatusTaskById(id: string, status: TaskStatus)   {
    const newTask = this.getTaskByID(id)
    // if(newTask){

        // newTask.status = status
    // }
    // console.log(newTask);
    
    // return newTask
   const task =  this.tasks.filter(task => task.id === newTask.id ? task.status = status : "")
    return task

}

getFilteredTask(filterDto : getTaskFilterDTO) : Task[]{
    const {status, search} = filterDto;
        let tasks = this.getAllTasks()
        if(search){
           tasks = tasks.filter(task=>{
                task.title.includes(search)  ||
                task.description.includes(search) ? task : ""

            })
            console.log(tasks);
        }
        if(status){
           tasks = tasks.filter(task => task.status === status)
        }
        if(!status) {
            throw new NotFoundException("No user found for this status")
        }
        

        return tasks
    
}

createTask(createTaskDTO: CreateTaskDTO): Task{
    const {title, description} = createTaskDTO
    const task: Task = {
        id: uuid(),
        title,
        description,
        status:TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task
    // when using return we reduce load on backend because we already return last task
}

}


// contain buisness logic