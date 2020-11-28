import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../task';

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.css'],
})
export class ArchivedTasksComponent implements OnInit {
  tasks: Task[];
  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getArchivedTasks();
    //console.log(this.tasks);
  }

  getArchivedTasks(): void {
    this.tasksService.getArchivedTasks().subscribe((response) => {
      this.tasks = response.sort(
        (a, b) => b.completedTimestamp - a.completedTimestamp
      );
    });
  }

  expandTask(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    task.expanded = !task.expanded;
  }
}
