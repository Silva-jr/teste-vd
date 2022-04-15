import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contacto } from 'src/app/security/models/contacto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = 'https://contacto-nestjs.herokuapp.com';
//const apiUrl = 'http://localhost:3000'
@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  addContacto(Users: any): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}/contacto`, Users, httpOptions)
      .pipe(tap(), catchError(this.handleError<any>('addContacto')));
  }
  addUserContacto(Users: any): Observable<any> {
    return this.http
      .post<any>(`${apiUrl}/contacto/userContacto`, Users, httpOptions)
      .pipe(tap(), catchError(this.handleError<any>('addUserContacto')));
  }

  deleteContacto(id: any): Observable<any> {
    const url = `${apiUrl}/contacto/${id}`;
    return this.http
      .put<any>(url, httpOptions)
      .pipe(tap(), catchError(this.handleError<any>('deleteContacto')));
  }

  updateContacto(id: any, user: any): Observable<any> {
    const url = `${apiUrl}/contacto/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(() => {}),
      catchError(this.handleError<any>('updateContacto'))
    );
  }

  getContacto(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}/contacto`).pipe(
      tap(() => {        
      }),
      catchError(this.handleError('getContacto', []))
    );
  }

  getContactoById(id: string): Observable<any> {
    const url = `${apiUrl}/contacto/${id}`;
    return this.http
      .get<any>(url)
      .pipe(
        tap(),
        catchError(this.handleError<any>(`getContactoById id=${id}`))
      );
  }
}
