import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAuth } from 'src/app/security/models/userAuth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const apiUrl = 'https://contacto-nestjs.herokuapp.com/auth';
//const apiUrl = 'http://localhost:3000/auth'
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  securityObject: UserAuth = new UserAuth();
  currentUser: UserAuth = {
    _id: null,
    email: null,
    nome: null,
    tipo_user: null,
    password: null,
    salt: null,
    isAdmin: null,
    isGestor: null,
    isFuncionario: null,
  };

  helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  userLogin(payload) {
    return this.http.post(`${apiUrl}/login`, payload);
  }

  logout() {
    sessionStorage.removeItem('Token');
    this.router.navigate(['pages/login']);
  }

  isTokenExperation(): boolean {
    const token = sessionStorage.getItem('Token');
    return !this.helper.isTokenExpired(token);
  }

  decodeTokne() {
    const decodedToken = this.helper.decodeToken(
      sessionStorage.getItem('Token')
    );
    this.currentUser = decodedToken;
    return this.currentUser;
  }
}
