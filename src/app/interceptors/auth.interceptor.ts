import { HttpInterceptorFn } from '@angular/common/http';
import { LocalstorageService } from '../services/functions/localstorage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let storage = new LocalstorageService;
  const token = storage.token.get();

  if (token || req.url.startsWith('/token')) {
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    })
    return next(authReq);
  }
  return next(req);
};
