import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuestionsService {

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    const url: string = `${environment.api}/questions`;
    return this.http.get<any[]>(url, {}).pipe(
      catchError(this.handleError<any[]>('getQuestions', []))
    );
  }

  getQuestionById(id: string): Observable<any> {
    const url: string = `${environment.api}/questions/${id}`;
    return this.http.get<any>(url, {}).pipe(
      catchError(this.handleError<any>('getQuestionById'))
    );
  }

  createQuestion(body: any): Observable<any> {
    const url: string = `${environment.api}/questions/`;
    return this.http.post<any>(url, body).pipe(
      catchError(this.handleError<any>('createQuestion'))
    );
  }

  updateQuestion(id: string, body: any): Observable<any> {
    const url: string = `${environment.api}/questions/${id}`;
    return this.http.put<any>(url, body).pipe(
      catchError(this.handleError<any>('updateQuestion'))
    );
  }

  deleteQuestion(id: string): Observable<any> {
    const url: string = `${environment.api}/questions/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError<any>('deleteQuestion'))
    );
  }
}
