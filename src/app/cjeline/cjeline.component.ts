import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-cjeline',
    templateUrl: './cjeline.component.html'
})
export class CjelineComponent implements OnInit {
    predmet;
    predmetFull;
    cjeline;
    meta = {
        predmet: this.predmet,
        predmetFull: this.predmetFull
    }
    constructor(private db: DatabaseService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.getPredmet(params['predmet']);
            this.predmet = params['predmet'];
        })
        this.db.dohvatiCjeline(this.predmet)
            .subscribe(cjeline => this.cjeline = cjeline);


    }



    getPredmet(pred) {
        switch (pred) {
            case "mat1":
                this.predmetFull = "Matematika 1";
                break;

            case "mat2":
                this.predmetFull = "Matematika 2";
                break;
            case "mat3":
                this.predmetFull = "Matematika 3";
                break;
            case "mat4":
                this.predmetFull = "Matematika 4";
                break;
            case "fiz2":
                this.predmetFull = "Fizika 2";
                break;
        }

    }

}
