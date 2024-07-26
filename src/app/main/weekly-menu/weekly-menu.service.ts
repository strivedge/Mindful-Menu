import { Injectable } from '@angular/core';
import { WeeklyMenuModule } from './weekly-menu.module';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: WeeklyMenuModule
})
export class WeeklyMenuService {

  constructor(private _http: HttpClient) { }
  getMeals(paramData?:any):any {

    let queryParams = new HttpParams()
    if(paramData && paramData.search){
      queryParams = queryParams.set('search', paramData.search)
    }
    if (paramData && paramData.page) {
      queryParams = queryParams.set('page', paramData.page)
    }
    if (paramData && paramData.limit) {
      queryParams = queryParams.set('limit', paramData.limit)
    }
    return this._http.get<any>(`${environment.apiUrl}/meals`,{params:queryParams});
  }

  getWeeklyMenu(paramData?:any) {
    let queryParams = new HttpParams()
    if(paramData && paramData.search){
      queryParams = queryParams.set('search', paramData.search)
    }
    if (paramData && paramData.page) {
      queryParams = queryParams.set('page', paramData.page)
    }
    if (paramData && paramData.limit) {
      queryParams = queryParams.set('limit', paramData.limit)
    }
    if (paramData && paramData.sort) {
        queryParams = queryParams.set('sort', paramData.sort)
    }

    return this._http.get<any>(`${environment.apiUrl}/weekly_menus`,{params:queryParams});
  }

  getWeeklyMenuItem(id:string) {
    return this._http.get<any>(`${environment.apiUrl}/weekly_menus/${id}`);
  }

  addWeeklyMenuItem(data:any){
    return this._http.post<any>(`${environment.apiUrl}/weekly_menus`,data);
  }

  updateWeeklyMenuItem(data:any){
    return this._http.put<any>(`${environment.apiUrl}/weekly_menus`,data);
  }

  removeWeeklyMenuItem(id:string){
    return this._http.delete<any>(`${environment.apiUrl}/weekly_menus/${id}`);
  }
}
