import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-cjeline',
    templateUrl: './cjeline.component.html'
})
export class CjelineComponent implements OnInit {
   predmet;
   predmetLink;
   data;
    constructor(private DB: DatabaseService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.predmetLink = params['predmet'];
            this.DB.getMeta().then(res=>{
                this.data = res[this.predmetLink]["cjeline"];
                this.predmet = res[this.predmetLink]["predmet"][0];
              
            })
        })
    }
}
