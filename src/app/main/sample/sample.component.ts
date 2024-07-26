import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { locale as en } from './i18n/en'
import { locale as fr } from './i18n/fr'
import { locale as de } from './i18n/de'
import { locale as pt } from './i18n/pt'

import { CoreTranslationService } from '@core/services/translation.service'
import {UserService} from "../../auth/service";
import { Observable } from 'rxjs'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  public contentHeader: object
  public basicSelectedOption: number = 10;
  tempData: any
  kitchenSinkRows: any
  table: any;
  tables$: Observable<any>;
  userData: any;
  userForm: FormGroup; 
  submit: boolean; 


  /**
   *
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(private _coreTranslationService: CoreTranslationService, private test:UserService,private modalService: NgbModal,private FormBuilder: FormBuilder) {
    this._coreTranslationService.translate(en, fr, de, pt)
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.userForm = this.FormBuilder.group({
      _id:[''],
       first_name:['',],
       last_name:['',],
       email:['',],
       dob: ['',],
       status:['',],
     });
     this.submit = false;
   
  
    this.userdata();
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
          {
            name: 'User',
            isLink: false
          }
        ]
      }
    }
  }

  userdata(){
    // console.log("kevalsinh")
    this.test.getAll().subscribe(res=>{
      // console.log(res);
      this.userData = res.data;
      // console.log(this.userData,"data");
      
    },err=>{

    })
  }


  modalOpenForm(modalForm,item) {
    // console.log(new Date(item.dob),"item");
    
    this.modalService.open(modalForm);
    this.userForm.patchValue({
     _id:item._id,
      first_name:item.first_name,
      last_name:item.last_name,
      email:item.email,
      dob: "2022-02-02",
      status:item.status,

    });
}

onSubmitConfirm(){
  // this.submit = true;
  console.log(this.userForm.value,"form");
 
}
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
