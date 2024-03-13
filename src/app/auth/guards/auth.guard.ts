import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad , CanActivate {
  
  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      return this.authService.verificaAutenticacion().
                  pipe(
                    tap( estaAutenticado => {
                      if( !estaAutenticado ){
                        this.router.navigate(['./auth/login']);      //si no esta aunternticado lo redirecciona al login
                      }
                    })
      );
  //     if(this.authService.auth.id){
  //       return true;
  //   }
  // console.log('bloqueado por el auth guards-canActivate')  
  // return false;
  }


  //restringe que se pueda cargar el modulo
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {

      return this.authService.verificaAutenticacion().
                  pipe(
                    tap( estaAutenticado => {
                      if( !estaAutenticado ){
                        this.router.navigate(['./auth/login']);      //si no esta aunternticado lo redirecciona al login
                      }
                    })
                  );
          //   if(this.authService.auth.id){
          //       return true;
          //   }
          // console.log('bloqueado por el auth guards-canLoad')  
          // return false;
  }
}
