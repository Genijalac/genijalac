import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'underscore';

@Component({
    selector: 'app-lekcije',
    templateUrl: './lekcije.component.html'
})
export class LekcijeComponent implements OnInit {
    predmetLink;
    cjelinaLink;
    data;
    cjelinaIme;
    cjelina;
    constructor(private DB: DatabaseService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.predmetLink = params['predmet'];
            this.cjelinaLink = params['cjelina'];
            let cjelinaLink = params['cjelina'];
            let holder;
            this.DB.getMeta().then(res => {
                let lekcije = res[this.predmetLink]["cjeline"];
                _.each(lekcije, function(element, index, list) {
                    if (element["cjelina"][1] == cjelinaLink) {
                        holder = element;
                    }
                })
                this.data = holder["data"];
                this.cjelinaIme = holder["cjelina"][0];
                console.log(this.data);
            })
        })
    }

}
