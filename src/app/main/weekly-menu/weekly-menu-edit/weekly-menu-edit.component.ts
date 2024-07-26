import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from 'environments/environment';
import {WeeklyMenuService} from '../weekly-menu.service';
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect';
import {FlatpickrOptions} from "ng2-flatpickr";
import {formatDate} from "@angular/common";
import {ToastrService} from 'ngx-toastr';
import {endOfWeek, startOfWeek, sub} from 'date-fns'


@Component({
    selector: 'app-weekly-menu-edit',
    templateUrl: './weekly-menu-edit.component.html',
    styleUrls: ['./weekly-menu-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WeeklyMenuEditComponent implements OnInit {
    @ViewChild('startPicker') pickerStart;
    @ViewChild('endPicker') pickerEnd;
    @ViewChild('publishPicker') publishPicker;

    public contentHeader: object;
    public startDateOptions: FlatpickrOptions = {
        plugins: [weekSelect()],
        altInput: true,
        altFormat: "Y-m-d",
        dateFormat: "Y-m-d",
        weekNumbers: true,
        locale: {
            "firstDayOfWeek": 1 // start week on Monday
        },
        onClose: function (selectedDates, dateStr, instance) {
            instance.setDate(instance.weekStartDay);
        }
    };
    public endDateOptions: FlatpickrOptions = {
        noCalendar: true,
        altInput: true,
        altFormat: "Y-m-d",
        dateFormat: "Y-m-d",
    };
    public publishDateOptions: FlatpickrOptions = {
        altInput: true,
        altFormat: "Y-m-d",
        dateFormat: "Y-m-d",
        weekNumbers: true,
        locale: {
            "firstDayOfWeek": 1 // start week on Monday
        },
        onOpen: function (selectedDates, dateStr, instance) {
            // instance.config.minDate = '2022-06-01';
            // instance.set("disable", ['2022-06-06']);

        }

    }

    id: string;
    public selectBasicLoading = false;
    imageSrc: string = '';
    imgPath: string;
    selectBasic: any = []
    weeklyMenuForm: FormGroup;
    mealsArray: any = [[], [], [], [], [], [], []];


    constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private weeklyService: WeeklyMenuService, private toastrService: ToastrService) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.imgPath = environment.imagePath;
        this.weeklyMenuForm = this.fb.group({

            _id: [''],
            start_date: ['', Validators.required],
            end_date: [''],
            publish_date: ['', Validators.required],
            week_number: ['',],
            image_url: [''],
            introduction: [''],
            meals: this.fb.array([]),
        });

        this.weeklyMenuForm.controls.start_date.valueChanges.subscribe(
            (value) => {
                if (this.pickerStart.flatpickr.weekEndDay) {
                    let a = formatDate(this.pickerStart.flatpickr.weekEndDay, 'yyyy-MM-dd', 'en-US');
                    this.weeklyMenuForm.controls.end_date.setValue(a);
                    this.pickerEnd.flatpickr.setDate(this.pickerStart.flatpickr.weekEndDay);
                    this.setPublishDateRange(this.pickerStart.flatpickr.selectedDates[0])
                }
            }
        );
    }

    get meals(): FormArray {
        return this.weeklyMenuForm.get('meals') as FormArray;

    }

    addMeal() {
        let meal = this.fb.group({
            meal_id: [null, Validators.required],
        });
        this.meals.push(meal);
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
                        isLink: true,
                        link: '/weekly-menu'
                    },
                    {
                        name: 'weekly-menu-add-edit',
                        isLink: false
                    }
                ]
            }
        };

        if (this.id == 'add') {
            for (let i = 0; i < 7; i++) {
                this.addMeal();
            }

        } else {
            this.getWeeklyMenuById()
        }
    }

    uploadFile(event) {
        const file = (event.target as HTMLInputElement).files[0];
        let reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageSrc = reader.result as string; // base64 Image src
            this.weeklyMenuForm.patchValue({
                image_url: this.imageSrc
            });


        };
    }

    _handleReaderLoaded(e) {
        let reader = e.target;
        this.weeklyMenuForm.patchValue({
            image_url: reader.result
        });


    }

    reset() {
        this.router.navigate(['/weekly-menu']);
    }

    submitForm() {
        let data = {}
        if (this.weeklyMenuForm.valid) {
            if (typeof (this.weeklyMenuForm.value.image_url) == 'string') {
                data['start_date'] = formatDate(this.weeklyMenuForm.value.start_date, 'yyyy-MM-dd', 'en-US');
            } else {
                data['start_date'] = formatDate(this.weeklyMenuForm.value.start_date[0], 'yyyy-MM-dd', 'en-US');
            }
            if (typeof (this.weeklyMenuForm.value.publish_date) == 'string') {
                data['publish_date'] = formatDate(this.weeklyMenuForm.value.publish_date, 'yyyy-MM-dd', 'en-US');
            } else {
                data['publish_date'] = formatDate(this.weeklyMenuForm.value.publish_date[0], 'yyyy-MM-dd', 'en-US');
            }
        }

        // data['start_date']=typeof (this.weeklyMenuForm.value.start_date)=='string'?this.weeklyMenuForm.value.start_date:this.weeklyMenuForm.value.start_date.toISOString();
        data['end_date'] = this.weeklyMenuForm.value.end_date;
        // data['publish_date']=this.weeklyMenuForm.value.publish_date;
        // data['week_number']=this.weeklyMenuForm.value.week_number;
        data['image_url'] = this.weeklyMenuForm.value.image_url;
        data['introduction'] = this.weeklyMenuForm.value.introduction;
        data['meals'] = this.weeklyMenuForm.value.meals.map(x => x.meal_id);
        console.log("data", data);
        if (this.id == 'add') {

            this.weeklyService.addWeeklyMenuItem(data).subscribe(
                (res) => {
                    if (res.flag == true) {

                        this.router.navigate(['/weekly-menu']);
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Create Weekly Menu ', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                }
                            );
                        }, 100);
                    }
                }
            )
        } else {
            data['_id'] = this.weeklyMenuForm.value._id;
            this.weeklyService.updateWeeklyMenuItem(data).subscribe(
                (res) => {
                    this.router.navigate(['/weekly-menu']);
                    setTimeout(() => {
                        this.toastrService.success(
                            'You have successfully Update Weekly Menu ', 'Success', {
                                toastClass: 'toast ngx-toastr',
                                closeButton: true
                            }
                        );
                    }, 100);
                }
            )
        }

    }

    mealsSearch(event, index) {
        if (event.term.length > 0) {
            let data = {}
            data['search'] = event.term;
            this.weeklyService.getMeals(data).subscribe(
                (res) => {
                    let data = res.data.map(item => {
                        return {
                            _id: item._id,
                            name: item.name
                        }
                    });
                    this.mealsArray[index] = data;
                }, error => {
                    console.log(error);
                }
            )

        }
        // this.mealServices.getMeals(data)

    }

    // get weekly menu by id
    getWeeklyMenuById() {

        this.weeklyService.getWeeklyMenuItem(this.id).subscribe(res => {
            this.pickerStart.flatpickr.setDate(formatDate(res.data.start_date, 'yyyy-MM-dd', 'en-US','UTC'));
            this.pickerEnd.flatpickr.setDate(formatDate(res.data.end_date, 'yyyy-MM-dd', 'en-US','UTC'));
            this.publishPicker.flatpickr.setDate(formatDate(res.data.publish_date, 'yyyy-MM-dd', 'en-US','UTC'));
            this.setPublishDateRange(new Date(formatDate(res.data.start_date, 'yyyy-MM-dd', 'en-US','UTC')));


            if (res.data.image_url) {
                let imagePath = environment.imagePath;
                this.imageSrc = imagePath + res.data.image_url;
            }else{
                let imagePath = environment.imagePath;
                this.imageSrc = imagePath + res.data.meals[0].image_url;
            }
            this.weeklyMenuForm.patchValue({
                _id: res.data._id,
                start_date: res.data.start_date,
                end_date: res.data.end_date,
                publish_date: res.data.publish_date,
                week_number: res.data.week_number,
                // image_url: res.data.image_url,
                introduction: res.data.introduction,
            });
            res.data.meals.filter(x=>x?._id).map((meal, index) => {
                this.mealsArray[index].push(meal);
                let mealItem = this.fb.group({
                    meal_id: [meal._id, Validators.required],
                });
                this.meals.push(mealItem);
            });
            console.log('sss===', this.weeklyMenuForm.value)
        });
    }

    setPublishDateRange(date) {
        let previousDay = sub(date, {
            days: 1
        })
        let previousWeekStart = startOfWeek(previousDay, {weekStartsOn: 1})
        let previousWeekEnd = endOfWeek(previousDay, {weekStartsOn: 1})
        this.publishPicker.flatpickr.config.maxDate = previousWeekEnd;
        this.publishPicker.flatpickr.config.minDate = previousWeekStart;
    }


}
