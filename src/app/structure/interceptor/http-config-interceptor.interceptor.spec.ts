import { TestBed } from '@angular/core/testing';

import { HttpConfigInterceptorInterceptor } from './http-config-interceptor.interceptor';

describe('HttpConfigInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpConfigInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpConfigInterceptorInterceptor = TestBed.inject(HttpConfigInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
