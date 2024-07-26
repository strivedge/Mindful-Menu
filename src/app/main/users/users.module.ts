import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersListComponent} from './users-list/users-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {RouterModule} from '@angular/router';
import {CorePipesModule} from '@core/pipes/pipes.module';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';
import {TranslateModule} from '@ngx-translate/core';
import {CoreCommonModule} from '@core/common.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CoreDirectivesModule} from '@core/directives/directives';
import {CoreSidebarModule} from '@core/components';
import {AuthGuard} from 'app/auth/helpers';
import {UsersService} from './users.service';
import {CsvModule} from "@ctrl/ngx-csv";
import {Ng2FlatpickrModule} from "ng2-flatpickr";
import { TrialModalComponent } from './user-detail/trial-modal/trial-modal.component';

const routes = [
    {
        path: '',
        component: UsersListComponent,
        data: {animation: 'user-home'}
    },
    {
        path: 'user-details/:id',
        component: UserDetailComponent,
        data: {animation: 'user-detail'}
    },
    {
        path: 'edit/:id',
        component: UserEditComponent,
        data: {animation: 'user-edit'}
    },


];

@NgModule({
    declarations: [

        UsersListComponent,
        UserDetailComponent,
        UserEditComponent,
        TrialModalComponent,
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
        CsvModule,
        Ng2FlatpickrModule
    ],
    providers: [AuthGuard, UsersService]
})
export class UsersModule {
}
