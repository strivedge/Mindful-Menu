import {Component, OnInit, ViewEncapsulation} from '@angular/core'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    constructor() {
    }

    public contentHeader: object

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {
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

                ]
            }
        }


    }
}
