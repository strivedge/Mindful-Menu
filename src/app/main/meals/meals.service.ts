import {Injectable} from '@angular/core';
import {MealsModule} from "./meals.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: MealsModule
})
export class MealsService {

    constructor(private _http: HttpClient) {
    }

    getCategories(paramData?: any) {
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
        if (paramData.sort) {
            queryParams = queryParams.set('sort', paramData.sort)
        }

        return this._http.get<any>(`${environment.apiUrl}/categories`, {params: queryParams});
    }

    getCategory(id: string) {
        return this._http.get<any>(`${environment.apiUrl}/categories/${id}`);
    }

    addCategory(data: any) {
        return this._http.post<any>(`${environment.apiUrl}/categories`, data);
    }

    updateCategory(data: any) {
        return this._http.put<any>(`${environment.apiUrl}/categories`, data);
    }

    removeCategory(id: string) {
        return this._http.delete<any>(`${environment.apiUrl}/categories/${id}`);
    }

// items
    getItems(paramData?: any) {
        let queryParams = new HttpParams()
        if (paramData && paramData.categoryId) {
            queryParams = queryParams.set('category_id', paramData.categoryId)
        }
        if (paramData && paramData.search) {
            queryParams = queryParams.set('search', paramData.search)
        }
        if (paramData && paramData.page) {
            queryParams = queryParams.set('page', paramData.page)
        }
        if (paramData && paramData.limit) {
            queryParams = queryParams.set('limit', paramData.limit)
        }
        if (paramData.sort) {
            queryParams = queryParams.set('sort', paramData.sort)
        }
        if(paramData.status){
            queryParams = queryParams.set('status', paramData.status)
        }

        return this._http.get<any>(`${environment.apiUrl}/items`, {params: queryParams});
    }

    getItem(id: string) {
        return this._http.get<any>(`${environment.apiUrl}/items/${id}`);
    }

    addItem(data: any) {
        return this._http.post<any>(`${environment.apiUrl}/items`, data);
    }

    updateItem(data: any) {
        return this._http.put<any>(`${environment.apiUrl}/items`, data);
    }

    removeItem(id: string) {
        return this._http.delete<any>(`${environment.apiUrl}/items/${id}`);
    }

    getMeals(paramData?: any) {
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
        if (paramData && paramData.sort) {
            queryParams = queryParams.set('sort', paramData.sort)
        }
        if (paramData && paramData.is_gluten_free) {
            queryParams = queryParams.set('is_gluten_free', paramData.is_gluten_free)
        }
        if (paramData && paramData.is_dairy_free) {
            queryParams = queryParams.set('is_dairy_free', paramData.is_dairy_free)
        }
        if (paramData && paramData.is_vegetarian) {
            queryParams = queryParams.set('is_vegetarian', paramData.is_vegetarian)
        }
        if (paramData && paramData['ingredients.item']) {
            queryParams = queryParams.set('ingredients.item', paramData['ingredients.item'])
        }
        return this._http.get<any>(`${environment.apiUrl}/meals`, {params: queryParams});
    }

    getMeal(id: string) {
        return this._http.get<any>(`${environment.apiUrl}/meals/${id}`);
    }

    addMeal(data: any) {
        return this._http.post<any>(`${environment.apiUrl}/meals`, data);
    }

    updateMeal(data: any) {
        return this._http.put<any>(`${environment.apiUrl}/meals`, data);
    }

    removeMeal(id: string) {
        return this._http.delete<any>(`${environment.apiUrl}/meals/${id}`);
    }

    //nutrients
    getNutrients() {
        return this._http.get<any>(`${environment.apiUrl}/nutrients`);
    }

    getNutrient(id: string) {
        return this._http.get<any>(`${environment.apiUrl}/nutrients/${id}`);
    }

    addNutrient(data: any) {
        return this._http.post<any>(`${environment.apiUrl}/nutrients`, data);
    }

    updateNutrient(data: any) {
        return this._http.put<any>(`${environment.apiUrl}/nutrients`, data);
    }

    removeNutrient(id: string) {
        return this._http.delete<any>(`${environment.apiUrl}/nutrients/${id}`);
    }

}
