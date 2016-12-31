import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'povijest',
    templateUrl: './povijest.component.html'
})
export class PovijestComponent implements OnInit {
    @Input() meta;
    predmet;
    predmetName;
    cjelina;
    CjelinaName;


    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
    	console.log(this.meta);
        this.route.params.forEach((params: Params) => {

        })

    }

}
