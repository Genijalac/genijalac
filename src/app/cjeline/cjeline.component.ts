import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Params }   from '@angular/router';
@Component({
    selector: 'app-cjeline',
    templateUrl: './cjeline.component.html'
})
export class CjelineComponent implements OnInit {
    predmet;
    cjeline;
    constructor(private db: DatabaseService,
    	private route: ActivatedRoute) {}

    ngOnInit() {
    	this.route.params.forEach((params:Params)=>{
    		this.predmet = params['predmet']
    	})
        this.db.dohvatiCjeline(this.predmet)
            .subscribe(cjeline => this.cjeline = cjeline);


    }

}
