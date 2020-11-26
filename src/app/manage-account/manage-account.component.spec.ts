import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';

import { ManageAccountComponent } from './manage-account.component';

describe('ManageAccountComponent', () => {
  let component: ManageAccountComponent;
  let fixture: ComponentFixture<ManageAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAccountComponent],
      providers: [
        { provide: AuthService },
        { provide: AccountService },
        FormBuilder,
        Router,
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
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
