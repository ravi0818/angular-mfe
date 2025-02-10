import { HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from 'common';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const store = inject(Store);

  const excludedUrls = [
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/refresh',
  ];

  if (excludedUrls.some((url) => req.url.includes(url))) {
    return next(req);
  }

  return store.select(selectToken).pipe(
    take(1),
    switchMap((accessToken) => {
      const newReq = accessToken
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        : req;

      return next(newReq);
    })
  );
}
