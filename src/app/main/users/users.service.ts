import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { UsersModule } from './users.module';

@Injectable({
  providedIn: UsersModule
})
export class UsersService {

  constructor(private _http: HttpClient) { }
  getAll(paramData?: any) {
    // console.log(paramData);
    
    let queryParams = new HttpParams()
    if (paramData && paramData.search) {
      queryParams = queryParams.set('search', paramData.search)
    }
    if (paramData && paramData.page) {
      queryParams = queryParams.set('page', paramData.page)
    }
    if (paramData && paramData.limit) {
      queryParams = queryParams.set('limit', paramData.limit)
    }
    if(paramData && paramData.sort) {
        queryParams = queryParams.set('sort', paramData.sort)
    }
    if(paramData && paramData.user_sub_status){
      queryParams=queryParams.set('user_sub_status',paramData.user_sub_status)
    }
    if(paramData && paramData.is_ios_android){
      queryParams=queryParams.set('is_ios_android',paramData.is_ios_android)
    }
    return this._http.get<any>(`${environment.apiUrl}/users`, { params: queryParams });
  }
  getuserById(id: string) {
    return this._http.get<any>(`${environment.apiUrl}/users/${id}`);
  }
  updateUser(data: any) {
    return this._http.put<any>(`${environment.apiUrl}/users/`, data);
  }

  //get address by user id
  getAddressByUserId(id: string) {
    return this._http.get<any>(`${environment.apiUrl}/addressbyuserid/${id}`);
  }
  addTrial(data: any) {
    return this._http.post<any>(`${environment.apiUrl}/trial_subscription`, data);
  }
  
  
}
