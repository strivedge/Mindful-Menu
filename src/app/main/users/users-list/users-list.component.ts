import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {UsersService} from '../users.service';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

interface SortEvent {
    prop: string;
    dir: string;
}

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UsersListComponent implements OnInit {
    public ColumnMode = ColumnMode;
    public contentHeader: object
    userData: any;
    pageDetail: any;
    total: any;
    sort: Array<SortEvent>;
    csvData: [] = [];
    subType: any[] = [];
    selectedSubType: any;

    constructor(private test: UsersService, private router: Router) {
        if (this.router.getCurrentNavigation().extras.state) {
            console.log('viraj', this.router.getCurrentNavigation().extras.state.subType);
            this.selectedSubType = this.router.getCurrentNavigation().extras.state.subType;
        }

        this.pageDetail = {
            searchText: '',
            page: 1,
            pageSize: 10,
        }
        this.sort = [{
            prop: 'createdAt',
            dir: 'desc'
        }]
        this.subType = [
            {id: 'Not sign in', name: 'Not sign-in'},
            {id: 'Trial', name: 'Trial'},
            {id: 'Trial expired', name: 'Trial expired'},
            {id: 'Subscribed', name: 'Subscribed'},
            {id: 'Subscribed/ios', name: 'Subscribed/ios'},
            {id: 'Subscribed/android', name: 'Subscribed/android'},
            {id: 'Subscription expired', name: 'Subscription expired'}
        ]

    }

    ngOnInit(): void {

        // page breadcrumb start here------------
        this.contentHeader = {
            headerTitle: 'Users List',
            actionButton: false,
            breadcrumb: {
                type: '',
                links: [
                    {
                        name: 'Dashboard',
                        isLink: true,
                        link: '/'
                    },
                    {
                        name: 'User',
                        isLink: false
                    }
                ]
            }
        }
        // page breadcrumb end here------------

        // get all user data function initialize start here------------
        this.userdata();
        this.getAllUserData();
        // get all user data function initialize end here------------
    }

    //set params for search ,sort and pagination start here------------
    setParams() {
        let params = {};
        params['search'] = this.pageDetail.searchText;
        params['page'] = this.pageDetail.page;
        params['limit'] = this.pageDetail.pageSize;
        params['sort'] = this.sort[0].prop + '-' + this.sort[0].dir;
        if (this.selectedSubType) {
            if (this.selectedSubType == 'Subscribed') {
                params['is_ios_android'] = this.selectedSubType;
            } else {
                params['user_sub_status'] = this.selectedSubType;
            }

        }
        return params;
    }

    //set params for search ,sort and pagination end here------------
    vvtest(event) {
        console.log(event)
        console.log(this.selectedSubType)
    }

    //user data function start here------------
    userdata() {
        let params = this.setParams();
        this.test.getAll(params).subscribe(res => {
            if (res.data == null || res.data.length == 0) {
                this.userData = [{}];
            } else {
                this.userData = res.data;
            }
            this.total = res.page_data.total;
        }, err => {

        })
    }

    //user data function end here------------

    // change page limit function start here------------
    changeLimit() {
        this.pageDetail.page = 1;
        this.pageDetail.searchText = '';
        this.filterUpdate()
    }

    // change page limit function end here------------

    // filter search ,sort and pagination change function start here------------
    filterUpdate(event?: any) {
        if (event && event.target && event.target.type == 'search') {
            this.pageDetail.page = 1;
        }
        if (event && (event.pageSize || event.offset)) {
            this.pageDetail.page = event.offset + 1;
            this.pageDetail.pageSize = event.pageSize;
        }
        if (event && (event.sorts)) {
            this.pageDetail.page = 1;
            this.sort[0] = event.sorts[0];
        }
        let params = this.setParams();
        this.test.getAll(params).subscribe(res => {
            if (res.data == null || res.data.length == 0) {
                this.userData = [{}];
            } else {
                this.userData = res.data;
            }
            this.total = res.page_data.total;
        }, err => {
        })
    }

    // filter search ,sort and pagination change function end here------------

    //csv data function start here------------
    getAllUserData() {

        this.test.getAll().pipe(
            map(res => res.data),
            map(res => {
                return res.map(item => {
                    return {
                        FullName: item.first_name + ' ' + item.last_name,
                        Email: item.email,
                        Mobile: item.mobile,
                    }
                })
            })
        ).subscribe(data => {
            this.csvData = data;
        }, err => {
        })
    }

}


