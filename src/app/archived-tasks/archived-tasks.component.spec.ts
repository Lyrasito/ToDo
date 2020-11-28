import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TasksService } from '../services/tasks.service';

import { ArchivedTasksComponent } from './archived-tasks.component';

class MockTasksService {
  getArchivedTasks() {
    return of(['a', 'b', 'c']);
  }
}

describe('ArchivedTasksComponent', () => {
  let component: ArchivedTasksComponent;
  let fixture: ComponentFixture<ArchivedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivedTasksComponent],
      providers: [{ provide: TasksService, useClass: MockTasksService }],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
