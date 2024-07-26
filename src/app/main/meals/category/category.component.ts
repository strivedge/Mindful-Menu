import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MealsService} from "../meals.service";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {ColumnMode} from '@swimlane/ngx-datatable';

interface SortEvent {
    prop: string;
    dir: string;
}

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
    public ColumnMode = ColumnMode;
    public contentHeader: object
    submit: boolean;
    categories: any = []
    categoryForm: FormGroup;
    pageDetail: any;
    total: any;
    sort: Array<SortEvent>;

    constructor(private meal: MealsService, private modalService: NgbModal, private FormBuilder: FormBuilder, private toastrService: ToastrService) {
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

    get CategoryFormControl() {
        return this.categoryForm.controls;
    }

    ngOnInit(): void {
        this.categoryForm = this.FormBuilder.group({
            _id: [''],
            name: ['', Validators.required],
            status: [''],
        });
        this.submit = false;

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
                        name: 'categories',
                        isLink: false
                    }
                ]
            }
        }
        this.getCategories();
    }

    //set params for search ,sort and pagination start here------------
    setParams() {
        let params = {};
        params['search'] = this.pageDetail.searchText;
        params['page'] = this.pageDetail.page;
        params['limit'] = this.pageDetail.pageSize;
        params['sort'] = this.sort[0].prop + '-' + this.sort[0].dir;
        return params;
    }

    //set params for search ,sort and pagination end here------------

    reset() {
        this.categoryForm.reset();
    }

    getCategories() {
        let params = this.setParams();
        this.meal.getCategories(params).subscribe(res => {
            this.categories = res.data;
            this.total = res.page_data.total;
        }, err => {
        })
    }

    changeLimit() {
        this.pageDetail.page = 1;
        this.pageDetail.searchText = '';
        this.filterUpdate()
    }

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
        this.meal.getCategories(params).subscribe(res => {
            this.categories = res.data;
            this.total = res.page_data.total;
        }, err => {
        })
    }

    modalOpenForm(modalForm, categoryData: any) {
        if (!categoryData) {
            this.modalService.open(modalForm);
            this.categoryForm.patchValue({
                _id: "",
                name: "",
                status: true,
            });
        } else {
            this.modalService.open(modalForm);
            this.categoryForm.patchValue({
                _id: categoryData._id,
                name: categoryData.name,
                status: categoryData.status,
            });
        }
    }

    categorySubmit() {
        this.submit = true;
        if (this.categoryForm.invalid) {
            return;
        }
        if (this.categoryForm.value._id) {
            this.meal.updateCategory(this.categoryForm.value).subscribe(res => {
                if (res.flag) {
                    this.getCategories();
                    this.modalService.dismissAll();
                    this.categoryForm.reset();
                    setTimeout(() => {
                        this.toastrService.success(
                            'You have successfully Update Category ', 'Success', {
                                toastClass: 'toast ngx-toastr',
                                closeButton: true
                            }
                        );
                    });
                }

            }, err => {
            })
        } else {
            // console.log(this.categoryForm.value);
            if (this.categoryForm.value.status == "") {
                this.categoryForm.value.status = false
            }
            ;
            this.meal.addCategory(this.categoryForm.value).subscribe(res => {
                    if (res.flag) {
                        this.getCategories();
                        this.modalService.dismissAll();
                        this.categoryForm.reset();
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Create Category ', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                }
                            );
                        });
                    }
                }
                , err => {
                    console.log(err);
                }
            )
        }
    }

    DeleteCategory(id) {
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
                this.meal.removeCategory(id).subscribe(res => {
                    if (res.flag) {
                        this.getCategories();
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Delete Category ', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                }
                            );
                        }, 100);
                    }

                }, err => {
                });
            }
        });
    }
}
