import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postData(payload, requrl): Observable<any> {
    const url = `${environment.apiEndpoint + requrl}`;
    return this.http.post<any>(url, payload);
  }

  getData(requrl) {
    const url = `${environment.apiEndpoint + requrl}`;
    return this.http.get<any>(url);
  }

  getDataWithParams(obj, requrl) {
    const url = `${environment.apiEndpoint + requrl}`;
    return this.http.get<any>(url, { params: obj });
  }
}
