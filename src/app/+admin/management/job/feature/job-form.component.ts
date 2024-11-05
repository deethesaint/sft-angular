import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'job-form',
    standalone: true,
    template: `
        <div [class]="{'tw-hidden': isHidden}">
            
        </div>
    `
})

export class JobFormComponent implements OnInit {
    isHidden: boolean = true;
    constructor() { }

    ngOnInit() { }
}