import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MealsService} from "../meals.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-meal-edit',
    templateUrl: './meal-edit.component.html',
    styleUrls: ['./meal-edit.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MealEditComponent implements OnInit {
    @ViewChild('itemModal', {read: TemplateRef}) itemModal: TemplateRef<any>;
    @ViewChild('categoryModal', {read: TemplateRef}) categoryModal: TemplateRef<any>;

    ItemForm: FormGroup;
    categoryForm: FormGroup;
    id: string;
    public contentHeader: object
    allCategories: any[] = [];
    categories: any = [];
    mealForm: FormGroup;
    imageSrc: string = '';
    imgPath: string;
    active = 1;
    itemsList: any = [];
    isSubmit = false;
    nutrition = [
        {
            "name": "root1",
            "id": 4635515726751,
            "children": [
                {
                    "name": "Total Fat",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": true,
                    "id": 1700324601008,
                    "children": [
                        {
                            "name": "Saturated Fat",
                            "amount": "",
                            "dailyAmount": "",
                            "isBold": false,
                            "id": 5073924552237
                        },
                        {
                            "name": "Trans Fat",
                            "amount": "",
                            "dailyAmount": "",
                            "isBold": false,
                            "id": 3846155504149
                        }
                    ]
                },
                {
                    "name": "Cholesterol",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": true,
                    "id": 6963548865073
                },
                {
                    "name": "Sodium",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": true,
                    "id": 6976107551165
                },
                {
                    "name": "Total Carbohydrate",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": true,
                    "id": 2542794462231,
                    "children": [
                        {
                            "name": "Dietary Fiber",
                            "amount": "",
                            "dailyAmount": "",
                            "isBold": false,
                            "id": 203916436081
                        },
                        {
                            "name": "Sugars",
                            "amount": "",
                            "dailyAmount": "",
                            "isBold": false,
                            "id": 9931579786539
                        }
                    ]
                },
                {
                    "name": "Protein",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": true,
                    "id": 9536272755621
                },
                {
                    "name": "Vitamin A",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": false,
                    "id": 9536272755754
                },
                {
                    "name": "Vitamin c",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": false,
                    "id": 9536272755755
                },
                {
                    "name": "Calcium",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": false,
                    "id": 9536272755756
                },
                {
                    "name": "Iron",
                    "amount": "",
                    "dailyAmount": "",
                    "isBold": false,
                    "id": 9536272755757
                }
            ]
        }
    ];
    submit: boolean;

    constructor(private route: ActivatedRoute, private mealsService: MealsService, private fb: FormBuilder, private router: Router, private toastrService: ToastrService, private modalService: NgbModal) {
        this.submit = false;
        this.id = this.route.snapshot.paramMap.get('id');
        this.imgPath = environment.imagePath;
        this.mealForm = this.fb.group({

            _id: [''],
            name: ['', Validators.required],
            image_url: [''],
            preparation_time: ['', Validators.required],
            cook_time: ['', Validators.required],
            serves: [''],
            serves_per_container: [''],
            serves_size: [''],
            calories: [''],
            nutrients: [[]],
            is_gluten_free: [''],
            is_dairy_free: [''],
            is_vegetarian: [''],
            source_name: [''],
            source_url: [''],
            tips: [''],
            ingredients: this.fb.array([]),
            preparation_instructions: this.fb.array([]),
            cooking_instructions: this.fb.array([]),
        });
    }

    get meal(): FormGroup {
        return this.mealForm.get('meal') as FormGroup;
    }

    get ingredients(): FormArray {
        return this.mealForm.controls["ingredients"] as FormArray;
    }

    get preparation_instructions(): FormArray {
        return this.mealForm.controls["preparation_instructions"] as FormArray;
    }

    get cooking_instructions(): FormArray {
        return this.mealForm.controls["cooking_instructions"] as FormArray;
    }

    addIngredient() {
        this.categories.push([]);
        this.itemsList.push([]);
        let ingredient = this.fb.group({
            amount: ['', Validators.required],
            category: [null, Validators.required],
            item: [null, Validators.required],
            notes: ['']
        });
        this.ingredients.push(ingredient);
    }

    addCookingInstruction() {
        let instruction = this.fb.group({
            instructions: ['', Validators.required],
        });
        this.cooking_instructions.push(instruction);
    }

    addPreparationInstruction() {
        let instruction = this.fb.group({
            instructions: ['', Validators.required],
        });
        this.preparation_instructions.push(instruction);
    }

    removeIngredient(index: number) {
        this.itemsList.splice(index, 1);
        this.categories.splice(index, 1);
        this.ingredients.removeAt(index);
    }

    removePreparationInstruction(index: number) {
        this.preparation_instructions.removeAt(index);
    }

    removeCookingInstruction(index: number) {
        this.cooking_instructions.removeAt(index);
    }

    reset() {
        this.categoryForm.reset();
    }

    ngOnInit(): void {

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
                        name: 'Meals',
                        isLink: true,
                        link: '/meals/meals-list'
                    },
                    {
                        name: 'Meal Edit',
                        isLink: false
                    }
                ]
            }
        };
        if (this.id !== 'add') {
            this.getMeal();
        } else {
            this.addIngredient();
            this.addPreparationInstruction();
            this.addCookingInstruction();
        }
        this.categoryForm = this.fb.group({
            _id: [''],
            name: ['', Validators.required],
            status: [''],
            index: [''],
        });
        this.ItemForm = this.fb.group({
            _id: [''],
            name: ['', Validators.required],
            categories_id: [''],
            status: [''],
            index: [''],
        });
        this.getAllCategories()
    }

    uploadFile(event) {
        const file = (event.target as HTMLInputElement).files[0];
        let reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.imageSrc = reader.result as string; // base64 Image src
            this.mealForm.patchValue({
                image_url: this.imageSrc
            });
        };
    }

    _handleReaderLoaded(e) {
        let reader = e.target;
        this.mealForm.patchValue({
            image_url: reader.result
        });

    }

    getMeal() {
        this.mealsService.getMeal(this.id).subscribe(
            res => {
                if (res.flag == true) {
                    res.data.ingredients.filter(x=>x.category?._id && x.item?._id).map((item, index) => {
                        this.categories.push([]);
                        this.itemsList.push([]);
                        this.categories[index].push(item.category);
                        this.itemsList[index].push(item.item);
                        let ingredient = this.fb.group({
                            amount: [item.amount, Validators.required],
                            category: [item.category._id, Validators.required],
                            item: [item.item._id, Validators.required],
                            notes: [item.notes]
                        });
                        this.ingredients.push(ingredient);
                    })
                    res.data.cooking_instructions.map(item => {
                        let instruction = this.fb.group({
                            instructions: [item, Validators.required],
                        });
                        this.cooking_instructions.push(instruction);
                    })
                    res.data.preparation_instructions.map(item => {
                        let instruction = this.fb.group({
                            instructions: [item, Validators.required],
                        });
                        this.preparation_instructions.push(instruction);
                    });
                    if (res.data.image_url) {
                        let imagePath = environment.imagePath;
                        this.imageSrc = imagePath + res.data.image_url;
                    }
                    this.nutrition = res.data.nutrients.length > 0 ? res.data.nutrients : this.nutrition;
                    this.mealForm.patchValue(
                        {
                            _id: res.data._id,
                            name: res.data.name,
                            preparation_time: res.data.preparation_time,
                            cook_time: res.data.cook_time,
                            serves: res.data.serves,
                            is_gluten_free: res.data.is_gluten_free,
                            is_dairy_free: res.data.is_dairy_free,
                            is_vegetarian: res.data.is_vegetarian,
                            source_name: res.data.source_name,
                            source_url: res.data.source_url,
                            tips: res.data.tips,
                            calories: res.data.calories,
                            serves_per_container: res.data.serves_per_container,
                            serves_size: res.data.serves_size,
                        }
                    );
                }
            },
            error => {
                console.log(error);
            });
    }

    addItems(data) {
        for (let i = 0; i < data.length; i++) {
            let categoryId = data[i].category;
            let prams = {};
            if (categoryId) {
                prams['categoryId'] = categoryId;
            }
            this.mealsService.getItems(prams).subscribe(
                async res => {

                    this.itemsList.push(res.data);
                },
                error => {
                    console.log(error);
                });
        }
    }

    getCategories(event, index) {
        if (event.term.length > 0) {
            let prams = {};
            prams['search'] = event.term;
            this.mealsService.getCategories(prams).subscribe(
                async res => {
                    this.categories[index] = res.data;
                }, error => {
                    console.log(error);
                });
        }
    }

    setCategory(event, index) {
        console.log(event, index);
        if (event && event.tag) {
            this.modalOpenForm('item', this.itemModal, index, event.name);
        } else {
            this.itemsList[index] = [];
            if (event && event.categories_id && event.categories_id._id) {
                this.itemsList[index].push(event);
                this.categories[index] = [];
                this.categories[index].push(event.categories_id)
                let ingredientsArray = this.mealForm.get('ingredients') as FormArray;
                ingredientsArray.controls[index].get('category').setValue(event.categories_id._id);
            }
        }
    }

    setItems(event, index) {
        if (event && event.tag) {
            this.modalOpenForm('category', this.categoryModal, index, event.name);
        } else {
            this.itemsList[index] = [];
            this.categories[index] = [];
            if (event) {
                this.categories[index].push(event)
            }
            let ingredientsArray = this.mealForm.get('ingredients') as FormArray;
            ingredientsArray.controls[index].get('item').setValue(null);

        }
    }

    getItems(event, index, category?) {
        let prams = {};
        if (category) {
            prams['categoryId'] = category;
        }
        prams['search'] = event.term;
        this.mealsService.getItems(prams).subscribe(
            res => {
                this.itemsList[index] = res.data;
            },
            error => {
                console.log(error);
            });
    }

    tagBtn(event) {
        return {name: event, tag: true}
    }


    submitMeal() {
        this.mealForm.value.nutrients = this.nutrition;
        this.mealForm.value.cooking_instructions = this.mealForm.value.cooking_instructions.map(x => x.instructions);
        this.mealForm.value.preparation_instructions = this.mealForm.value.preparation_instructions.map(x => x.instructions);
        if (this.id == 'add') {
            this.mealsService.addMeal(this.mealForm.value).subscribe(
                res => {
                    if (res.flag == true) {
                        this.router.navigate(['/meals/meals-list']);
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Create Meal ', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                }
                            );
                        }, 100);
                    }
                },
                error => {
                    console.log(error);
                });
        } else {
            this.mealsService.updateMeal(this.mealForm.value).subscribe(
                res => {
                    if (res.flag == true) {
                        this.router.navigate(['/meals/meals-list']);
                        setTimeout(() => {
                            this.toastrService.success(
                                'You have successfully Update Meal ', 'Success', {
                                    toastClass: 'toast ngx-toastr',
                                    closeButton: true
                                }
                            );
                        }, 100);
                    }
                },
                error => {
                    console.log(error);
                });
        }

    }

    modalOpenForm(type, modalForm, index, name?) {
        if (type == 'category') {
            this.modalService.open(modalForm);
            this.categoryForm.patchValue({
                _id: "",
                name: name,
                status: true,
                index: index
            });
        }
        if (type == 'item') {
            this.modalService.open(modalForm);
            this.ItemForm.patchValue({
                _id: "",
                name: name,
                categories_id: "",
                status: true,
                index: index
            });
        }
    }

    categorySubmit() {
        this.submit = true;
        if (this.categoryForm.invalid) {
            return;
        }

        if (this.categoryForm.value.status == "") {
            this.categoryForm.value.status = false
        }
        let index = this.categoryForm.value.index;
        this.mealsService.addCategory(this.categoryForm.value).subscribe(res => {
            if (res.flag == true) {
                this.itemsList[index] = [];
                this.categories[index] = [];
                this.categories[index].push(res.data);
                let ingredientsArray = this.mealForm.get('ingredients') as FormArray;
                ingredientsArray.controls[index].get('category').setValue(res.data._id);
                ingredientsArray.controls[index].get('item').setValue(null);
                this.modalService.dismissAll();
                this.toastrService.success(
                    'You have successfully Create Category ', 'Success', {
                        toastClass: 'toast ngx-toastr',
                        closeButton: true
                    })
            }
        }, error => {
            console.log(error);
        });
    }

    itemSubmit() {
        this.submit = true;
        if (this.ItemForm.invalid) {
            return;
        }

        if (this.ItemForm.value.status == "") {
            this.ItemForm.value.status = false
        }
        let index = this.ItemForm.value.index;
        this.mealsService.addItem(this.ItemForm.value).subscribe(res => {
            if (res.flag == true) {
                this.itemsList[index] = [];
                this.categories[index] = [];
                this.itemsList[index].push(res.data);
                this.categories[index].push(res.data.categories_id);

                let ingredientsArray = this.mealForm.get('ingredients') as FormArray;
                ingredientsArray.controls[index].get('item').setValue(res.data._id);
                ingredientsArray.controls[index].get('category').setValue(res.data.categories_id._id);

                this.modalService.dismissAll();
                this.toastrService.success(
                    'You have successfully Create Item ', 'Success', {
                        toastClass: 'toast ngx-toastr',
                        closeButton: true
                    })
            }
        }, error => {
            console.log(error);
        });
    }

    getAllCategories() {
        let params = {};

        this.mealsService.getCategories(params).subscribe(
            res => {
                // console.log(res.data);
                this.allCategories = res.data;
            }
        )
    }

}
