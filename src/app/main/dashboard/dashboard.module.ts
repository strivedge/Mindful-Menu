import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {CoreCommonModule} from '@core/common.module';
import {TranslateModule} from '@ngx-translate/core';
import {ContentHeaderModule} from 'app/layout/components/content-header/content-header.module';
import { SubCountCardComponent } from './sub-count-card/sub-count-card.component';
import {DashboardService} from "./dashboard.service";

const routes = [
    {
        path: '',
        component: DashboardComponent,
        data: {animation: 'dashboardHome'}
    }

];

@NgModule({
    declarations: [DashboardComponent, SubCountCardComponent],
    imports: [
        RouterModule.forChild(routes), CommonModule,
        ContentHeaderModule, TranslateModule, CoreCommonModule
    ],
    providers: [DashboardService]
})
export class DashboardModule {
}
