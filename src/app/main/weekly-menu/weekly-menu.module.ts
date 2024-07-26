import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyMenuListComponent } from './weekly-menu-list/weekly-menu-list.component';
import { WeeklyMenuEditComponent } from './weekly-menu-edit/weekly-menu-edit.component';
import { WeeklyMenuService } from './weekly-menu.service';
import { RouterModule } from '@angular/router';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {Ng2FlatpickrModule} from "ng2-flatpickr";

const routes = [
  {
    path: '',
    component: WeeklyMenuListComponent,
    data: { animation: 'weekly-home' }
  },
  {
    path: 'add-edit/:id',
    component: WeeklyMenuEditComponent,
    data: { animation: 'weekly-add-edit' }
  },
  
  
];

@NgModule({
  declarations: [
    WeeklyMenuListComponent,
    WeeklyMenuEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePipesModule,
    ContentHeaderModule, TranslateModule, CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    SweetAlert2Module.forRoot(), Ng2FlatpickrModule

  ],
  providers: [WeeklyMenuService],
})
export class WeeklyMenuModule { }
