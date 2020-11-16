import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../task';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      {
        id: 1,
        submitter: 'Marie',
        title: 'Task 1',
        description: 'Do task 1',
        dueDate: '11/01/2020',
        priority: 3,
        completed: true,
      },
      {
        id: 2,
        submitter: 'Kevin',
        title: 'Task 2',
        description: 'Do task 2',
        dueDate: '11/11/2020',
        priority: 2,
        completed: false,
      },
      {
        id: 3,
        submitter: 'Isabelle',
        title: 'Task 3',
        description: 'Do task 3',
        dueDate: '11/21/2020',
        priority: 1,
        completed: true,
      },
    ];
    return { tasks };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(tasks: Task[]): number {
    return tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 11;
  }
}
