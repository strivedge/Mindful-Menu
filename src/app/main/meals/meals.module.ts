import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../../auth/helpers";
import {CoreCommonModule} from "../../../@core/common.module";
import {MealsService} from "./meals.service";
import {ContentHeaderModule} from "../../layout/components/content-header/content-header.module";
import {TranslateModule} from "@ngx-translate/core";
import { MealsListComponent } from './meals-list/meals-list.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreSidebarModule } from '@core/components';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddNutritionComponent } from './meal-edit/add-nutrition/add-nutrition.component';
import {TreeModule} from "@circlon/angular-tree-component";
import { NutrientComponent } from './nutrient/nutrient.component';
import {CsvModule} from "@ctrl/ngx-csv";

const routes = [
  {
    path: 'categories',
    component: CategoryComponent,
    data: { animation: 'meal-categories' }
  },
  {
    path: 'items',
    component: ItemComponent,
    data: { animation: 'meal-items' }
  },{
    path: 'meals-list',
    component: MealsListComponent,
    data: { animation: 'meal-list' }
  },{
    path: 'add-update/:id',
    component: MealEditComponent,
    data: { animation: 'meal-add-update' }
  },
  {
    path: 'nutrient',
    component: NutrientComponent,
    data: { animation: 'meal-nutrient' }
  }
];

@NgModule({
  declarations: [
    CategoryComponent,
    ItemComponent,
    MealsListComponent,
    MealEditComponent,
    AddNutritionComponent,
    NutrientComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CoreCommonModule,
        ContentHeaderModule,
        TranslateModule,
        NgxDatatableModule,
        NgbNavModule,
        NgbModule,
        NgSelectModule,
        NgxDatatableModule,
        CoreSidebarModule,
        TreeModule,
        SweetAlert2Module.forRoot(),
        CsvModule
    ],
  providers:[AuthGuard,MealsService]
})
export class MealsModule { }
