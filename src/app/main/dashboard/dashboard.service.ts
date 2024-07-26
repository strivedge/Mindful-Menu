import { Injectable } from '@angular/core';
import {DashboardModule} from "./dashboard.module";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: DashboardModule
})
export class DashboardService {

  constructor(private _http: HttpClient) { }

  getSubCounts() {
    return this._http.get<any>(`${environment.apiUrl}/user_dashboard`);
  }
}
