import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksService } from '../services/tasks.service';

import { ArchivedTasksComponent } from './archived-tasks.component';

describe('ArchivedTasksComponent', () => {
  let component: ArchivedTasksComponent;
  let fixture: ComponentFixture<ArchivedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchivedTasksComponent],
      providers: [{ provide: TasksService }],
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
