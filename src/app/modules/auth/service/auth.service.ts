import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable,tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL:string =environment.api;

  constructor(private http:HttpClient,private cookie: CookieService) { }

 sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    const root = `${this.URL}/auth/login`
    console.log(root)
    console.log(body)
   return this.http.post(root,body).pipe(
      tap((responseOk:any)=>{
        console.log(responseOk)
        const {tokenSession,data}= responseOk;
        this.cookie.set('token',tokenSession,4,'/')
      })
    )
  }

}
