import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-sub-count-card',
    templateUrl: './sub-count-card.component.html',
    styleUrls: ['./sub-count-card.component.scss']
})
export class SubCountCardComponent implements OnInit {
    @Input() color = '';
    @Input() title = '';
    @Input() numbers = 0;
    @Input() textColor = '';
    @Input() titleValue = '';

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    test() {
        if(this.titleValue=='0'){
            this.router.navigate(['users'])
        }else{
            this.router.navigate(['users'],{ state: { subType: this.titleValue } })
        }

    }
}
