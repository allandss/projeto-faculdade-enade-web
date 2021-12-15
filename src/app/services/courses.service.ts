import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CoursesService {

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    const url: string = `${environment.api}/courses`;
    return this.http.get<any[]>(url, {}).pipe(
      catchError(this.handleError<any[]>('getCourses', []))
    );
  }

  getCourseById(id: string): Observable<any> {
    const url: string = `${environment.api}/courses/${id}`;
    return this.http.get<any>(url, {}).pipe(
      catchError(this.handleError<any>('getCourseById'))
    );
  }

  createCourse(body: any): Observable<any> {
    const url: string = `${environment.api}/courses/`;
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError<any>('createCourse'))
    );
  }

  updateCourse(id: string, body: any): Observable<any> {
    const url: string = `${environment.api}/courses/${id}`;
    return this.http.put<any>(url, body).pipe(
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  deleteCourse(id: string): Observable<any> {
    const url: string = `${environment.api}/courses/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError<any>('deleteCourse'))
    );
  }
}
