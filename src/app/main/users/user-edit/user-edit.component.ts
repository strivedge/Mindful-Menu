import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public contentHeader: object
  id: string;
  userItem:any=[];
  userAddress:any=[];
  public UserDetailsForm: FormGroup;
  public UserAddressForm: FormGroup;
  public UDFormSubmitted = false;
  public AddressSubmit = false;
  submit: boolean;
  private _success = new Subject<string>();
  successMessage = '';
  error = '';
  success = '';

  constructor(private route : ActivatedRoute, private userService: UsersService,private formBuilder: FormBuilder,private router: Router) { }

  get UserFormControl() {
    return this.UserDetailsForm.controls;
  }
  get AddressFormControl(){
    return this.UserAddressForm.controls;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      this.success = "";
      this.error = "";
    });
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
            isLink: true,
            link: '/users/user-details/'+this.id
          },{
            name: 'User Edit',
            isLink: false
          }
        ]
      }
    }
    this.UserAddressForm = this.formBuilder.group({
      _id: [''],
      user_id: [''],
      city: ['', Validators.required],
      street : ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip_code: ['', Validators.required],
      is_default: [''],
    });

    this.UserDetailsForm = this.formBuilder.group(
      {
        _id: [''],
        first_name: ['', Validators.required],
        last_name: [''],
        email: ['', [Validators.required, Validators.email]],
        mobile: [''],
        role: ['', [Validators.required]],
        status: ['',],
        is_admin: ['', Validators.required],
      });
      this.submit = false;
    this.userdata();
    this.getAddress();
  }

  userdata(){
    let id = this.id;
    this.userService.getuserById(id).subscribe(res=>{
      this.userItem = res.data.user;
      this.UserDetailsForm.patchValue({
        _id : this.userItem._id,
        first_name:this.userItem.first_name,
        last_name:this.userItem.last_name,
        email:this.userItem.email,
        mobile:this.userItem.mobile,
        role:this.userItem.role,
        status:this.userItem.status,
        is_admin:!!this.userItem.is_admin,
      })
    },err=>{

    })
  }
  

  DetailsForm(){
    console.log(this.UserDetailsForm);
    this.UDFormSubmitted = true;
    if (this.UserDetailsForm.invalid) {
      return;
    }
    this.submit = true;
    let data = this.UserDetailsForm.value;
    console.log(data,"data");
    this.userService.updateUser(data).subscribe(res=>{
      this.submit = false;
      this.success = "User Updated Successfully";
      this.router.navigate(['/users/user-details/'+this.id]);

    },err=>{
      this.submit = false;
      this.error = "User Update Failed";
    })
  
  }
  AddressFormSubmit(){
      this.router.navigate(['/users/user-details/'+this.id]);
  }

  getAddress(){
    
    this.userService.getAddressByUserId(this.id).subscribe(res=>{
      this.userAddress = res.data;
      this.UserAddressForm.patchValue({
        _id : this.userAddress._id,
        user_id : this.userAddress.user_id,
        city : this.userAddress.city,
        street : this.userAddress.street,
        state : this.userAddress.state,
        country : this.userAddress.country,
        zip_code : this.userAddress.zip_code,
        is_default : this.userAddress.is_default,
      })
    },err=>{
      console.log(err,"address");
    })
  }
  reset(){
    this.router.navigate(['/users/user-details/'+this.id]);
  }
}
