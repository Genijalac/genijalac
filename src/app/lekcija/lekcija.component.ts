import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-lekcija',
    templateUrl: './lekcija.component.html',
    styleUrls: ['style.scss']
})
export class LekcijaComponent implements OnInit {
    html;
    videoId ="template";
    constructor(private DB: DatabaseService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.DB.getLesson(params).then(res => {
                this.html = res['__content'];
                this.videoId = res['videoId'];
            })
        })
    }

}
