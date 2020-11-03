import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  //tasks: Task[]
  priority;
  user = this.authService.user;
  constructor(private tasksService: TasksService, private authService: AuthService) {}
  message: string;

  ngOnInit(): void {
    //console.log(this.tasksService.tasks)
  }

  createTask(task) {
    this.tasksService.createTask(task).subscribe((response) => {
      //this.tasks.push(response)
      this.message = `Your task has been submitted!`;
    });
  }

  selectPriority(e) {
    this.priority = e;
    console.log(this.priority);
  }
}
