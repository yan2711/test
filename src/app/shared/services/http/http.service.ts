import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HttpService {
  private URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Исполнение POST запроса
  public post<T, D>(
    url: string,
    data?: D,
    params?: {
      [key: string]: string;
    },
    config: {} = {},
    responseType: 'json' = 'json'
  ): Observable<T> {
    return this.http.post<T>(this.URL + url, data, {
      withCredentials: true,
      responseType,
      ...(params ? { params } : {}),
      ...config,
    });
  }

  // Исполнение PUT запроса
  put<T, D>(
    url: string,
    data?: D,
    params?: {
      [key: string]: string;
    },
    config: {} = {},
    responseType: 'json' = 'json'
  ): Observable<T> {
    return this.http.put<T>(this.URL + url, data, {
      withCredentials: true,
      responseType,
      ...(params ? { params } : {}),
      ...config,
    });
  }

  // Исполнение GET запроса
  get<T>(
    url: string,
    params: any = '{}',
    config: { [key: string]: string } = {},
    responseType: 'json' = 'json',
    headers?: HttpHeaders
  ): Observable<T> {
    // Возвращаем response
    return this.http.get<T>(this.URL + url, {
      headers: headers,
      withCredentials: true,
      responseType,
      params,
      ...config,
    });
  }
}
