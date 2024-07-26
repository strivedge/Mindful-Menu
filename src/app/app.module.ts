import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import 'hammerjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {ToastrModule} from 'ngx-toastr'; // For auth after login toast
import {CoreModule} from '@core/core.module';
import {CoreCommonModule} from '@core/common.module';
import {CoreSidebarModule, CoreThemeCustomizerModule} from '@core/components';

import {coreConfig} from 'app/app-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {AuthGuard, ErrorInterceptor, JwtInterceptor} from "./auth/helpers";

const appRoutes: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./main/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('./main/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'plans',
        loadChildren: () => import('./main/plans/plans.module').then(m => m.PlansModule),
        canActivate: [AuthGuard]
    },
    {
        path : 'meals',
        loadChildren:() => import('./main/meals/meals.module').then(m=>m.MealsModule),
        canActivate:[AuthGuard]
    },
    {
        path: 'weekly-menu',
        loadChildren: () => import('./main/weekly-menu/weekly-menu.module').then(m => m.WeeklyMenuModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },

    {
        path: '**',
        redirectTo: '/pages/miscellaneous/error' //Error 404 - Page not found
    }
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, {
            scrollPositionRestoration: 'enabled', // Add options right here
            relativeLinkResolution: 'legacy'
        }),
        TranslateModule.forRoot(),

        //NgBootstrap
        NgbModule,
        ToastrModule.forRoot(),
        // Core modules
        CoreModule.forRoot(coreConfig),
        CoreCommonModule,
        CoreSidebarModule,
        CoreThemeCustomizerModule,
        // App modules
        LayoutModule,
    ],

    bootstrap: [AppComponent],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        // fakeBackendProvider
    ]
})
export class AppModule {
}
