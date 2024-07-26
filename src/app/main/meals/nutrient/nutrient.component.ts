import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MealsService} from "../meals.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ColumnMode} from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";

@Component({
    selector: 'app-nutrient',
    templateUrl: './nutrient.component.html',
    styleUrls: ['./nutrient.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NutrientComponent implements OnInit {
    public contentHeader: object
    public ColumnMode = ColumnMode;
    basicSelectedOption: number = 10;
    nutrients: any = [];
    nutrientForm: FormGroup;


    constructor(private FormBuilder: FormBuilder, private mealService: MealsService, private toastrService: ToastrService, private modalService: NgbModal) {

    }


    ngOnInit(): void {
        this.nutrientForm = this.FormBuilder.group({
            _id: [''],
            name: ['', Validators.required],
        });


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
                        name: 'nutrients',
                        isLink: false
                    }
                ]
            }
        }

        this.getAllNutrients();
    }

    //get all nutrients
    getAllNutrients() {
        this.mealService.getNutrients().subscribe(
            (res) => {
                console.log(res)
                this.nutrients = res.data;
            }
        )
    }

    openModalForm(content, nutrient) {
        if (!nutrient) {
            this.modalService.open(content);
            this.nutrientForm.patchValue({
                _id: "",
                name: ""
            });
        } else {
            this.modalService.open(content);
            this.nutrientForm.patchValue({
                _id: nutrient._id,
                name: nutrient.name
            });
        }
    }

    nutrientFormSubmit() {
        if (this.nutrientForm.invalid) {
            return;
        }
        if (this.nutrientForm.value._id) {
            this.mealService.updateNutrient(this.nutrientForm.value).subscribe(res => {
                if (res.flag) {
                    this.getAllNutrients();
                    this.modalService.dismissAll();
                    this.nutrientForm.reset();
                    setTimeout(() => {
                        this.toastrService.success(
                            'You have successfully Update Nutrient ', 'Success', {
                                toastClass: 'toast ngx-toastr',
                                closeButton: true
                            });
                    });
                }

            }, err => {
            })
        } else {
            // console.log(this.nutrientForm.value);
            if (this.nutrientForm.value.status == "") {
                this.nutrientForm.value.status = false
            }
            ;
            this.mealService.addNutrient(this.nutrientForm.value).subscribe(res => {
                if (res.flag) {
                    this.getAllNutrients();
                    this.modalService.dismissAll();
                    this.nutrientForm.reset();
                    setTimeout(() => {
                        this.toastrService.success(
                            'You have successfully Create Nutrient ', 'Success', {
                                toastClass: 'toast ngx-toastr',
                                closeButton: true
                            });
                    });
                }
            }, err => {
                console.log(err);
            })
        }
    }
    reset() {
        this.nutrientForm.reset();
    }

    deleteNutrient(id) {
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
                this.mealService.removeNutrient(id).subscribe(res => {
                    if (res.flag) {
                        this.getAllNutrients();
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Delete nutrient ', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                });
                        }, 100);
                    }
                }, err => {
                });
            }
        });
    }

}





