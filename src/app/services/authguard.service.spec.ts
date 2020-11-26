import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from './auth.service';

import { AuthguardService } from './authguard.service';

describe('AuthguardService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService }, Router],
      imports: [HttpClientModule, AppRoutingModule],
    })
  );

  it('should be created', () => {
    const service: AuthguardService = TestBed.get(AuthguardService);
    expect(service).toBeTruthy();
  });
});
