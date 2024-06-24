import { HttpInterceptorFn } from "@angular/common/http";

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  if (token == null) {
    token = ''
  }
  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(cloneRequest);
}

