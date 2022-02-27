import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getData<T>(url: string, httpParams?: any): Observable<T> {
    return this.http.get<T>(this.createURL(url, httpParams), { headers: this.createHeader(), params: httpParams });
  }

  public postData<T>(url: string, data?: any): Observable<T> {
    return this.http.post<T>(this.createURL(url), data, { headers: this.createHeader() });
  }

  public deleteData<T>(url: string, httpParams?: any): Observable<T> {
    return this.http.delete<T>(this.createURL(url), { headers: this.createHeader(), params: httpParams });
  }

  public updateData<T>(url: string, data?: any): Observable<T> {
    return this.http.put<T>(this.createURL(url), data, { headers: this.createHeader() });
  }

  private createHeader = (): HttpHeaders => {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    });
  }

  private createURL = (url: string, httpParams?: any): string => {
    //return environment.production ? `http://localhost:5022/api/${url}` : `http://localhost:5022/api/${url}`;
    return environment.production ? `http://localhost:${this.constructUrl(url, httpParams)}` : `http://localhost:${this.constructUrl(url, httpParams)}`;
  }
  private constructUrl = (route: string, httpParams?: any): string => {
    let url: string = '';
    if (route.toLowerCase() === 'pizza') {
      url = `5000/api/${route}`
    }
    else if (route.toLowerCase() === 'sides') {
      if (httpParams) {
        if (httpParams.sideEnum === 7)
          url = `5003/api/${route}`
        else if (httpParams.sideEnum === 8)
          url = `5005/api/Beverages`
        else if (httpParams.sideEnum === 9)
          url = `5007/api/Desserts`
      }
    }
    else if (route.toLowerCase() === 'custompizza' || route.toLowerCase() === 'custompizza/toppings') {
      url = `5009/api/${route}`
    }
    else if (route.toLowerCase().includes('pizzacart')) {
      url = `5011/api/${route}`
    }
    else if (route.toLowerCase().includes('order')) {
      url = `5013/api/${route}`
    }
    return url;
  }
}
