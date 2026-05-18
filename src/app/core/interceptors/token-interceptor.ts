import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access.token');
  const auth = inject(AuthService);

  const request = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(request).pipe(
    catchError((error) => {
      const invalidToken =
        error?.status === 400 && error?.error?.errorKeys?.includes('errors.token_invalid');

      if (invalidToken) {
        auth.signOut();
      }

      return throwError(() => error);
    }),
  );
};
