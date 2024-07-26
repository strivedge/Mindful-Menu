import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MealsService } from '../meals.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';
interface SortEvent {
  prop: string;
  dir: string;
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {
  public ColumnMode = ColumnMode;
  public contentHeader: object
  categories: any = [];
  submit: boolean;
  items: any = [];
  ItemForm: FormGroup;
  pageDetail: any;
  total: any;
  sort: Array<SortEvent>;

  constructor(private itemService: MealsService, private modalService: NgbModal, private FormBuilder: FormBuilder, private toastrService: ToastrService) {
    this.pageDetail = {
      searchText: '',
      page: 1,
      pageSize: 10,
    };
    this.sort = [{
      prop: 'createdAt',
      dir: 'desc'
    }];
  }
  get ItemFormControl() {
    return this.ItemForm.controls;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getItems();

    this.ItemForm = this.FormBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      categories_id: [''],
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
            name: 'items',
            isLink: false
          }
        ]
      }
    }
  }
  setParams() {
    let params = {};
    params['search'] = this.pageDetail.searchText;
    params['page'] = this.pageDetail.page ;
    params['limit'] = this.pageDetail.pageSize;
    params['sort'] = this.sort[0].prop + '-' + this.sort[0].dir;
    params['status']=true;
    return params;
  }
  reset() {
    // console.log("sdsddsdsd_____")
    this.ItemForm.reset();

  }
  getCategories() {
    let params = {};

    this.itemService.getCategories(params).subscribe(
      res => {
        // console.log(res.data);
        this.categories = res.data;
      }
    )
  }

  getItems() {
    let params = this.setParams();
    this.itemService.getItems(params).subscribe(
      res => {
         console.log(res.data);
        this.items = res.data;
        this.total = res.page_data.total;
      }
    )
  }
  changeLimit() {
    this.pageDetail.page = 1;
    this.pageDetail.searchText = '';
    // console.log(this.pageDetail.page);
    this.filterUpdate()
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

    this.itemService.getItems(params).subscribe(
      res => {
        // console.log(res.data);
        this.items = res.data;
        this.total = res.page_data.total;
      }
      , err => {
      })

  }

  modalOpenForm(modalForm, categoryData: any) {
    // console.log(categoryData);
    if (!categoryData) {
      this.modalService.open(modalForm);
      this.ItemForm.patchValue({
        _id: "",
        name: "",
        categories_id: "",  // this.categories[0]._id,
        status: true,

      });
    }
    else {
      // console.log(categoryData.categories_id);

      this.modalService.open(modalForm);
      this.ItemForm.patchValue({
        _id: categoryData._id,
        name: categoryData.name,
        categories_id: categoryData.categories_id._id,
        status: categoryData.status,

      });
    }

  }

  itemDetails() {
    this.submit = true;
    // console.log(this.ItemForm.value);
    if (this.ItemForm.value._id) {
      this.itemService.updateItem(this.ItemForm.value).subscribe(res => {
        if (res.flag) {
          this.modalService.dismissAll();
          this.getItems();
          this.ItemForm.reset();
          setTimeout(() => {
            this.toastrService.success(
              'You have successfully Update Item ' ,'Success',{toastClass: 'toast ngx-toastr',
              closeButton: true}
          );
          }, 100);
        }
      }, err => {

      })
    } else {
      if (this.ItemForm.value.status == "") {
        this.ItemForm.value.status = false
      }
      this.itemService.addItem(this.ItemForm.value).subscribe(res => {
        if (res.flag) {
          this.modalService.dismissAll();
          this.getItems();
          this.ItemForm.reset();
          setTimeout(() => {
            this.toastrService.success(
              'You have successfully Create Item ' ,'Success',{toastClass: 'toast ngx-toastr',
              closeButton: true}
          );
          }, 100);
        }
      }, err => {

      })
    }

  }

  itemDelete(id) {
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

        this.itemService.removeItem(id).subscribe(res => {
       
          if (res.flag) {

            this.getItems();
            setTimeout(() => {
              this.toastrService.success(
                'You have successfully Delete Item ' ,'Success',{toastClass: 'toast ngx-toastr',
                closeButton: true}
            );
            }, 100);
          }

        }, err => {

        });
      }
    });
  }
}
