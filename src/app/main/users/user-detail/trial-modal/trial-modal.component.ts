import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FlatpickrOptions} from "ng2-flatpickr";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UsersService} from "../../users.service";
import {formatDate} from "@angular/common";

@Component({
    selector: 'app-trial-modal',
    templateUrl: './trial-modal.component.html',
    styleUrls: ['./trial-modal.component.scss']
})
export class TrialModalComponent implements OnInit, AfterViewInit {
    @ViewChild('startPicker') startPicker;
    @ViewChild('endPicker') endPicker;
    @Input() startDate?;
    @Input() endDate?;
    @Input() userId;

    trialForm: FormGroup;
    public startDateOptions: FlatpickrOptions = {
        altInput: true,
        altFormat: "Y-m-d",
        dateFormat: "Y-m-d",
        locale: {
            "firstDayOfWeek": 1 // start week on Monday
        }
    };
    public endDateOptions: FlatpickrOptions = {
        altInput: true,
        altFormat: "Y-m-d",
        dateFormat: "Y-m-d",
        locale: {
            "firstDayOfWeek": 1 // start week on Monday
        }
    }

    constructor(public modal: NgbActiveModal,
                private FormBuilder: FormBuilder,
                private userService: UsersService) {

        this.trialForm = this.FormBuilder.group({
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            userId: [''],
        });

        this.trialForm.controls.startDate.valueChanges.subscribe(
            (value) => {

                this.endPicker.flatpickr.config.minDate = new Date(value);

            }
        );
    }

    ngOnInit(): void {
        // this.startPicker.flatpickr.setDate(this.startDate);
        // this.endPicker.flatpickr.setDate(this.endDate);
    }

    addTrial() {
        if (this.trialForm.invalid) return;
        let data = {};
        data['start_date'] = formatDate(this.trialForm.value.startDate, 'yyyy-MM-dd', 'en-US');
        data['end_date'] = formatDate(this.trialForm.value.endDate, 'yyyy-MM-dd', 'en-US');
        data['user_id'] = this.trialForm.value.userId;
        console.log(data);
         this.userService.addTrial(data).subscribe(res=>{
             console.log(res);
             if(res.status == 200 && res.flag == true){
                 this.modal.close(true);
             }
         });

    }

    ngAfterViewInit() {
        this.startPicker.flatpickr.setDate(this.startDate);
        this.endPicker.flatpickr.setDate(this.endDate);
        this.trialForm.controls.userId.setValue(this.userId);
        this.trialForm.controls.startDate.setValue(this.startDate);
        this.trialForm.controls.endDate.setValue(this.endDate);

    }
}
