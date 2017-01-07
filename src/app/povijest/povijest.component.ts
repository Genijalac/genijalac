import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../database.service';
import * as _ from 'underscore';

@Component({
    selector: 'povijest',
    templateUrl: './povijest.component.html',
    styleUrls: ['./style.scss']
})
export class PovijestComponent implements OnInit {
    params;
    predmetLink;
    predmetName;
    cjelinaLink;
    cjelinaName;
    cjelina;
    jedinica;
    constructor(private route: ActivatedRoute,
        private DB: DatabaseService) {}
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.params = params;
            // console.log(this.params);
            this.cjelina = _.has(this.params, "cjelina");
            this.jedinica = _.has(this.params, "jedinica");
        })
        this.DB.getMeta().then(d => {
            let predmet = d[this.params["predmet"]];
            this.predmetLink = predmet["predmet"][1];
            this.predmetName = predmet["predmet"][0];

            // console.log(predmet);
            let findAttr = (item)  =>  {
                if (item["cjelina"][1] == this.params["cjelina"]) {
                    this.cjelinaName = item["cjelina"][0];
                    this.cjelinaLink = this.params["cjelina"];
                } else {
                    this.cjelinaName = item["cjelina"][0];
                    this.cjelinaLink = this.params["cjelina"];
                }
            }

            _.each(predmet["cjeline"], function(item, index, list) {
                // console.log(item);
                findAttr(item);
            })


        })
    }


}
