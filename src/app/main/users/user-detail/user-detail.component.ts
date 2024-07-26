import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../users.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FlatpickrOptions} from "ng2-flatpickr";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {TrialModalComponent} from "./trial-modal/trial-modal.component";
import { ColumnMode } from '@swimlane/ngx-datatable';



@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
    public contentHeader: object
    id: string;
    userItem: any = [];
    purchaseHistory: any = [];
    currentPlan: any = {};
    public ColumnMode = ColumnMode;
    historyToggle: boolean = false;

    constructor(private route: ActivatedRoute,
                private test: UsersService,
                private router: Router,
                private modalService: NgbModal,
                private FormBuilder: FormBuilder) {
        this.id = "";

    }

    ngOnInit(): void {
        this.contentHeader = {
            headerTitle: 'Users Detail',
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
                        isLink: true,
                        link: '/users'
                    },
                    {
                        name: 'User Detail',
                        isLink: false
                    }
                ]
            }
        }
        this.id = this.route.snapshot.paramMap.get('id');
        // console.log("thiit",this.id);
        this.userdata();
    }

    //user data by id
    userdata() {
        let id = this.id;
        this.test.getuserById(id).subscribe(res => {

            console.log(res);
            this.userItem = res.data.user;
            this.currentPlan = res.data.currentPlan;
            this.purchaseHistory = res.data.subDetails;
            // console.log(this.userData,"data");

        }, err => {
            console.log(err);
        })
    }

    reset() {
        this.router.navigate(['/users']);
    }

    addTrialModel() {
        // this.modalService.open(modalForm);
        const modalRef = this.modalService.open(TrialModalComponent);
        if(this.currentPlan.isTrial){
            modalRef.componentInstance.startDate = this.currentPlan.purchaseDate;
            modalRef.componentInstance.endDate = this.currentPlan.expirationDate;
        }else {
            modalRef.componentInstance.startDate = '';
            modalRef.componentInstance.endDate = '';
        }
        modalRef.componentInstance.userId = this.id;
        modalRef.closed.subscribe(result => {
            console.log(result);
            if(result){
                this.userdata();
            }

        });
    }

}
