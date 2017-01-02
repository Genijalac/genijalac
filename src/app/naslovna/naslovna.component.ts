import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service'

@Component({
    selector: 'app-naslovna',
    templateUrl: './naslovna.component.html'
})
export class NaslovnaComponent implements OnInit {
    constructor(private DB: DatabaseService) {}
    mat1 = false;
    mat2 = false;
    mat3 = false;
    mat4 = false;
    fiz2 = false;
    ngOnInit() {
        this.DB.getMeta().then(d => {
            if (d["mat1"]["cjeline"].length > 0 ) { this.mat1 = true; };
            if (d["mat2"]["cjeline"].length > 0 ) { this.mat2 = true; };
            if (d["mat3"]["cjeline"].length > 0 ) { this.mat3 = true; };
            if (d["mat4"]["cjeline"].length > 0 ) { this.mat4 = true; };
            if (d["fiz2"]["cjeline"].length > 0 ) { this.fiz2 = true; };
        });

    }

}
