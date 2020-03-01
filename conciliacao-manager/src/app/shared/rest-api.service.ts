import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL =  environment.apiURL;

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  get<T>(path: string, params?: any): Observable<T> {
    return this.http.get<T>(this.getUrl(path), {headers : this.httpOptions.headers, params})
      .pipe(
        catchError(this.handleError)
      );
  }
  getPageable<T>(path: string, params?: any): Observable<Page<T>> {
    return this.http.get<Page<T>>(this.getUrl(path), {headers : this.httpOptions.headers, params})
      .pipe(
        catchError(this.handleError)
      );
  }
  post<T>(path, obj?: any): Observable<T> {
    return this.http.post<T>(this.getUrl(path), obj,  this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUrl(path) {
    return this.apiURL + '/' + path;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.warn(error);
    return throwError(errorMessage);
  }


}
export class Page<T> {
  content: Array<T>;
  totalPages: number;
  totalElements: number;
  size: number;
  numberOfElements: number;
  pageable: Pageable;

}

export class Pageable {
  pageNumber: number;
  pageSize: number;
  offset:number;

}
