import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { TasksService } from '../services/tasks.service';

import { CreateTaskComponent } from './create-task.component';

class MockAuthService {
  user = {
    name: 'Test user',
    username: 'testusername',
    email: 'test@email.com',
  };
  isAdmin() {
    return true;
  }
  getTokenAndDecode() {
    return this.user;
  }
}

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTaskComponent],
      providers: [
        TasksService,
        { provide: AuthService, useClass: MockAuthService },
      ],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
