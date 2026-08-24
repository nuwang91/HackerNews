import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  private _http = inject(HttpClient);

  private API_URL = environment.API_URL;

  getData(url: string, param: string = ''): Observable<any> {
    return this._http.get(`${this.API_URL}/${url}.json${param}`);
  }
}
