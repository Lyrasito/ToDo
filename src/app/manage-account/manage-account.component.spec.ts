import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

import { ManageAccountComponent } from './manage-account.component';

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

describe('ManageAccountComponent', () => {
  let component: ManageAccountComponent;
  let fixture: ComponentFixture<ManageAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAccountComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: AccountService },
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
