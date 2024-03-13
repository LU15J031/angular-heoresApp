import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'                        // como esta proveido en el root se tiene acceso en toda la aplicacion de este servicio 
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _auth: Auth | undefined;                    

  get auth(){
    return { ...this._auth};    /// se desestructura para que no se alteren los valores
  }

  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean> {
    if( !localStorage.getItem('token') ){
      return of(false);                                                // of(false) transforma la respuesta como un observable de ese tipo 
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).
                pipe(
                  map( auth => {                                  // map recibe el resultado del operador anterior y lo transforma
                        this._auth = auth;                        //para mantener la informacion del usuario despues de hacer un refresh del navegador
                      return true;
                  })
                );                     
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).
                pipe(
                  tap( auth =>  this._auth = auth ),   // resp => console.log('authservice', resp)   
                  tap( auth => localStorage.setItem('token', auth.id ))   // grabando el id en el local storage
                );
  }


  logout(){
    this._auth = undefined;
  }
}
