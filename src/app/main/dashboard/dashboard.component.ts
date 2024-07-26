import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DashboardService} from "./dashboard.service";

export interface ContentHeader {
    headerTitle: string;
    actionButton: boolean;
    breadcrumb?: {
        type?: string;
        alignment?: string;
        links?: Array<{
            name?: string;
            isLink?: boolean;
            link?: string;
        }>;
    };
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    public contentHeader: ContentHeader
    subCountData: any = {
        total: 0,
        notSignIn: 0,
        subscribed:0,
        subExpired: 0,
        trial: 0,
        trialExpired: 0,
    };

    constructor(private dashboardService: DashboardService) {

    }

    ngOnInit(): void {
        this.contentHeader = {
            headerTitle: 'Dashboard',
            actionButton: false,

            breadcrumb: {
                type: '',
                links: [
                    {
                        name: 'Dashboard',
                        isLink: true,
                        link: '/'
                    },

                ]
            }
        }

        this.getSubCount();
    }

    getSubCount() {
        this.dashboardService.getSubCounts().subscribe(res => {
            this.subCountData.total = res.data.total;
            this.subCountData.subscribed=res.data.iosSub+res.data.androidSub;
            this.subCountData.subExpired=res.data.subExpired;
            this.subCountData.trial=res.data.trial;
            this.subCountData.trialExpired=res.data.trialExpired;
            this.subCountData.notSignIn=res.data.notSignIn;

        })
    }
}

