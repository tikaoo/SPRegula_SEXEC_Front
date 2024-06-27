import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,UrlTree  } from '@angular/router';
import { Observable } from 'rxjs';

export const isNumberGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const idUser = route.paramMap.get('id')

  if (idUser == null || isNaN(Number(idUser))) {
    return false
  } else {
    return true
  }
};
