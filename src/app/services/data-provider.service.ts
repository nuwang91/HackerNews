import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private API_URL = environment.API_URL;

  constructor(private _http: HttpClient) { }
  
  getData(url: string, param: string = ''): Observable<any> {
    return this._http.get(`${this.API_URL}/${url}.json${param}`);
  }
}
