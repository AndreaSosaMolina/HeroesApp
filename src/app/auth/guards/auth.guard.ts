import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad {

  constructor( private authService: AuthService,
                private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean  {

      return this.authService.verificaAutenticado()
          .pipe(
            tap(estaAutenticado => {
              if(!estaAutenticado){
                this.router.navigate(['./auth/login']);
              }
            })
          )


  //     if(this.authService.auth.id){
  //       return true;
  //     }
  //     console.log('Bloqueado por el  Authgard- CantActivate');
  //     return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {

      return this.authService.verificaAutenticado()
          .pipe(
            tap(estaAutenticado => {
              if(!estaAutenticado){
                this.router.navigate(['./auth/login']);
              }
            })
          )

    //   if(this.authService.auth.id){
    //     return true;
    //   }
      
    // console.log('Bloqueado por el Authgard- CanLoad');
    // return false;
  }
}
