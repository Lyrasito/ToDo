import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { TasksService } from '../services/tasks.service';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  //let tasksServiceStub: Partial<TasksService>;
  let tasksArray;
  let getTasksSpy;

  beforeEach(async () => {
    // stub UserService for test purposes
    tasksArray = ['A', 'B', 'C'];

    // Create a fake TwainService object with a `getQuote()` spy
    const tasksServiceStub = jasmine.createSpyObj('TasksService', ['getTasks']);
    // Make the spy return a synchronous Observable with the test data
    getTasksSpy = tasksServiceStub.getTasks.and.returnValue(of(tasksArray));

    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [
        { provide: TasksService, useValue: tasksServiceStub },
        { provide: AuthService },
        { provide: Router },
      ],
      imports: [HttpClientModule, AppRoutingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should call the tasks service', () => {
      component.ngOnInit();
      expect(component.tasks.length).toBe(3);
    });
  });
});
