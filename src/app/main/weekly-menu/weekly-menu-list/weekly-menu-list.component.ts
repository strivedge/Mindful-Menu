import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import {environment} from 'environments/environment';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {WeeklyMenuService} from '../weekly-menu.service';

interface SortEvent {
    prop: string;
    dir: string;
}

@Component({
    selector: 'app-weekly-menu-list',
    templateUrl: './weekly-menu-list.component.html',
    styleUrls: ['./weekly-menu-list.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class WeeklyMenuListComponent implements OnInit {
    public ColumnMode = ColumnMode;
    public contentHeader: object;
    pageDetail: any;
    total: any;
    imgPath: string;
    weeklyMenu: any = [];
    sort: Array<SortEvent>;

    constructor(private toastrService: ToastrService, private weeklyService: WeeklyMenuService) {
        this.imgPath = environment.imagePath;
        this.pageDetail = {
            searchText: '',
            page: 1,
            pageSize: 10,
        }
        this.sort = [{
            prop: 'start_date',
            dir: 'desc'
        }]
    }

    ngOnInit(): void {
        this.contentHeader = {
            headerTitle: 'Weekly Menu',
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
                        name: 'Weekly Menu',
                        isLink: false
                    }
                ]
            }
        }
        this.getWeeklyMenuList();
    }
    //set params for search ,sort and pagination start here------------
    setParams() {
        let params = {};
        params['search'] = this.pageDetail.searchText;
        params['page'] = this.pageDetail.page ;
        params['limit'] = this.pageDetail.pageSize;
        params['sort'] = this.sort[0].prop + '-' + this.sort[0].dir;
        return params;
    }
    //set params for search ,sort and pagination end here------------

    //get weekly menu list
    getWeeklyMenuList() {
        let params = this.setParams();
        this.weeklyService.getWeeklyMenu(params).subscribe(
            (response: any) => {
                this.weeklyMenu = response.data;
                this.total = response.page_data.total;
            },
            (error: any) => {
            }
        );
    }

    changeLimit() {
        this.pageDetail.page = 1;
        this.filterUpdate();
    }

    filterUpdate(event?: any) {
        if (event && event.target && event.target.type == 'search') {
            this.pageDetail.page = 1;
        }
        if (event && (event.pageSize || event.offset)) {
            this.pageDetail.page = event.offset+1;
            this.pageDetail.pageSize = event.pageSize;
        }
        if (event && (event.sorts)) {
            this.pageDetail.page = 1;
            this.sort[0] = event.sorts[0];
        }
        let params = this.setParams();
        console.log(params);
        this.weeklyService.getWeeklyMenu(params).subscribe(
            (response: any) => {
                this.weeklyMenu = response.data;
                this.total = response.page_data.total;
            })
    }

    deleteMenu(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7367F0',
            cancelButtonColor: '#E42728',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger ml-1'
            }
        }).then((result) => {
            if (result.value) {
                this.weeklyService.removeWeeklyMenuItem(id).subscribe(res => {
                    if (res.flag) {
                        this.getWeeklyMenuList();
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Delete Meal', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                });
                        }, 100);
                    }
                }, err => {
                  console.log(err);
                });
            }
        });
    }
}
