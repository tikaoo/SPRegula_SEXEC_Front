import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import {ICanDeActivate as CD} from '../Model/candeActivate'
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

Injectable({
  providedIn: 'root'
})

export const confirmExitGuard: CanDeactivateFn<CD> = (
  component:CD  ,
  currentRoute: ActivatedRouteSnapshot ,
   currentState:RouterStateSnapshot ,
   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree =>{
  return  component.desativarGuard ? component.desativarGuard() : true;
};

