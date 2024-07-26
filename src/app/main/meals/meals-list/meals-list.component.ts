import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {environment} from 'environments/environment';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {MealsService} from "../meals.service";
import {map} from "rxjs/operators";

interface SortEvent {
    prop: string;
    dir: string;
}

@Component({
    selector: 'app-meals-list',
    templateUrl: './meals-list.component.html',
    styleUrls: ['./meals-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MealsListComponent implements OnInit {
    public ColumnMode = ColumnMode;
    public contentHeader: object;
    meals: any = [];
    pageDetail: any;
    total: any;
    imgPath: string;
    sort: Array<SortEvent>;
    dietTypes: any = [];
    selectedDietTypes: any = [];
    selectedItem: any;
    items: any = [];
    mealCsvData: [] = [];
    csvHeaders = [
        {label: 'Name', key: 'name'},
        {label: 'Dietary Preferences', key: 'dietaryPreferences'},
        {label: 'Photo', key: 'imageUrl'},
    ];

    constructor(private mealService: MealsService, private toastrService: ToastrService) {
        this.dietTypes = [
            {id: 'is_gluten_free', name: 'Gluten Free'},
            {id: 'is_dairy_free', name: 'Dairy Free'},
            {id: 'is_vegetarian', name: 'Vegetarian'}
        ];
        this.imgPath = environment.imagePath;
        this.pageDetail = {
            searchText: '',
            page: 1,
            pageSize: 10,
        }
        this.sort = [{
            prop: 'createdAt',
            dir: 'desc'
        }]

    }

    // test(event) {
    //     console.log(this.selectedDietTypes);
    // }
    ngOnInit(): void {
        //content header start here------------------
        this.contentHeader = {
            headerTitle: 'Meals',
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
                        name: 'meals',
                        isLink: false
                    }
                ]
            }
        }
        //content header end here------------------
        this.getMeals();
        this.getCsvData();

    }

    setParams() {
        let params = {};
        params['search'] = this.pageDetail.searchText;
        params['page'] = this.pageDetail.page;
        params['limit'] = this.pageDetail.pageSize;
        params['sort'] = this.sort[0].prop + '-' + this.sort[0].dir;
        this.selectedDietTypes.map(item => {
            params[item] = true;
        });
        if (this.selectedItem) {
            params['ingredients.item'] = this.selectedItem;
        }
        return params;
    }

    getMeals() {
        let params = this.setParams();
        this.mealService.getMeals(params).subscribe(res => {
            this.meals = res.data;
            this.total = res.page_data.total;
        })
    }

    getCsvData() {
        this.mealService.getMeals().pipe(
            map(x => {
                return x.data.map(y => {
                    let dietaryPreferences = '';
                    if (y.is_gluten_free) {
                        dietaryPreferences += 'GF,';
                    }
                    if (y.is_dairy_free) {
                        dietaryPreferences += 'DF,';
                    }
                    if (y.is_vegetarian) {
                        dietaryPreferences += 'V,';
                    }
                    return {
                        name: y.name,
                        dietaryPreferences: dietaryPreferences.replace(/,\s*$/, ""),
                        imageUrl: y.image_url ? this.imgPath + y.image_url : '',
                    }
                })
            })
        ).subscribe(res => {
            this.mealCsvData = res;
        })

    }

    changeLimit() {
        this.pageDetail.page = 1;
        this.filterUpdate()
    }

    filterUpdate(event?: any, select?: any) {
        if (event && select == 'select') {
            this.items = [];
            this.items.push(event);
        }

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
        this.mealService.getMeals(params).subscribe(res => {
            this.meals = res.data;
            this.total = res.page_data.total;
        }, err => {
            console.log(err);
        })
    }

    deleteMeal(id) {
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
                this.mealService.removeMeal(id).subscribe(res => {
                    if (res.flag) {
                        this.getMeals();
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Delete Meal', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                }
                            );
                        }, 100);
                    }
                }, err => {
                    console.log(err);
                })
            }
        });
    }

    getItems(event) {
        let prams = {};
        prams['search'] = event.term;
        this.mealService.getItems(prams).subscribe(
            res => {
                this.items = res.data;
            },
            error => {
                console.log(error);
            });
    }

}
