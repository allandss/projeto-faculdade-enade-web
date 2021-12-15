import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SubjectsService {

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any[]> {
    const url: string = `${environment.api}/subjects`;
    return this.http.get<any[]>(url, {}).pipe(
      catchError(this.handleError<any[]>('getSubjects', []))
    );
  }

  getSubjectById(id: string): Observable<any> {
    const url: string = `${environment.api}/subjects/${id}`;
    return this.http.get<any>(url, {}).pipe(
      catchError(this.handleError<any>('getSubjectById'))
    );
  }

  createSubject(body: any): Observable<any> {
    const url: string = `${environment.api}/subjects/`;
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError<any>('createSubject'))
    );
  }

  updateSubject(id: string, body: any): Observable<any> {
    const url: string = `${environment.api}/subjects/${id}`;
    return this.http.put<any>(url, body).pipe(
      catchError(this.handleError<any>('updateSubject'))
    );
  }

  deleteSubject(id: string): Observable<any> {
    const url: string = `${environment.api}/subjects/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError<any>('deleteSubject'))
    );
  }
}
