import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ITreeOptions, TreeComponent} from "@circlon/angular-tree-component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MealsService} from "../../meals.service";

interface Item {
    name: string;
    amount: string;
    dailyAmount: number;
    isBold: boolean;
}

@Component({
    selector: 'app-add-nutrition',
    templateUrl: './add-nutrition.component.html',
    styleUrls: ['./add-nutrition.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddNutritionComponent implements OnInit {
    @ViewChild('tree') tree: TreeComponent;
    @Input() nodes: any = [];
    addNewNodeForm: FormGroup;
    form: FormGroup;
    nutrients: any = [];

    constructor(private mealService: MealsService, private modalService: NgbModal, private fb: FormBuilder, private rootFormGroup: FormGroupDirective) {

        this.addNewNodeForm = this.fb.group({
            name: ['', Validators.required],
            amount: [''],
            dailyAmount: [''],
            isBold: [false],
        });
    }

    ngOnInit(): void {
        if (this.nodes.length == 0) {
            this.nodes = [{
                name: 'root1',
            }];
        }
        this.form = this.rootFormGroup.control;
        this.getAllNutrients();
    }

    getAllNutrients() {
        this.mealService.getNutrients().subscribe(
            (res) => {
                this.nutrients = res.data;
            }
        )
    }

    ngAfterViewInit() {
        this.tree.treeModel.expandAll();
    }

    options: ITreeOptions = {
        displayField: 'name',
        useVirtualScroll: false,
        nodeHeight: 25,
        allowDrag: false,
        allowDrop: false,
    };

    selectedNode;

    onActivateNode(event: { node: { data: any; }; }) {
        this.selectedNode = event.node.data;
        // Do stuff with selected node
    }


    deleteIds(node: { id: any; children: any[]; }) {
        node.id = null;
        if (node.children) {
            node.children.forEach(child => this.deleteIds(child));
        }
    }

    addNode(node?: any) {
        const newNode: Item = this.addNewNodeForm.value;
        if (!node.data.children) {
            node.data.children = [];
        }
        node.data.children.push(newNode);
        this.tree.treeModel.update();

        const someNode = this.tree.treeModel.getNodeById(node.id);
        someNode.expand();
        this.addNewNodeForm.reset();
    }

    deleteNode(node, tree) {
        const parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
        parentNode.data.children = parentNode.data.children.filter(child => {
            return child !== node.data;
        });
        tree.treeModel.update();
        if (node && node.parent && node.parent.data && node.parent.data.children.length === 0) {
            node.parent.data.hasChildren = false;
        }

        if (this.selectedNode?.id === node.data.id) {
            this.selectedNode = null;
        }
    }

    editNode(node) {
        console.log('node----', node);
        node.data.name = this.addNewNodeForm.value.name;
        node.data.amount = this.addNewNodeForm.value.amount;
        node.data.dailyAmount = this.addNewNodeForm.value.dailyAmount;
        node.data.isBold = this.addNewNodeForm.value.isBold;
        this.tree.treeModel.update();
    }

    openDetailModel(content, node?) {
        if (node) {
            console.log('node---', node);
            this.addNewNodeForm.patchValue({
                name: node.data.name,
                amount: node.data.amount,
                dailyAmount: node.data.dailyAmount,
                isBold: node.data.isBold,
            });
            this.modalService.open(content);
        } else {
            this.addNewNodeForm.patchValue({
                name: null,
                amount: '',
                dailyAmount: '',
                isBold: false,
            });
            this.modalService.open(content);
        }


    }

    resetForm() {
        console.log('reset');
        this.addNewNodeForm.reset();
    }

}
