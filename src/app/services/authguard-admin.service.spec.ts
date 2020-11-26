import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { AuthguardAdminService } from './authguard-admin.service';

describe('AuthguardAdminService', () => {
  let service: AuthguardAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService }, Router],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthguardAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
