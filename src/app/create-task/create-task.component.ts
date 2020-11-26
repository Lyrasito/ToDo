import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Task } from '../task';
import { TasksService } from '../services/tasks.service';
import { TasksComponent } from '../tasks/tasks.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  //tasks: Task[]
  priority;
  user = this.authService.user;
  form: FormGroup;
  message: string;
  priorityError: string;
  constructor(
    private tasksService: TasksService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      submittedBy: [this.user.name, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    // console.log(this.authService.user);
  }

  get submittedBy() {
    return this.form.get('submittedBy');
  }
  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get dueDate() {
    return this.form.get('dueDate');
  }

  createTask(task) {
    if (!this.priority) {
      this.priorityError = 'Please select a priority level.';
      return;
    }
    this.tasksService.createTask(task).subscribe((response) => {
      this.message = `Your task has been submitted!`;
    });
  }

  selectPriority(num) {
    this.priority = num;
    this.priorityError = null;
  }
}
