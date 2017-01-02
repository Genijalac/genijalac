import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService {
    private meta;
    constructor(private http: Http) {}
    folder = 'assets/data/'
    _http(url) {
        return this.http.get(url)
            .map(response => < any[] > response.json().data);
    }
    public getLesson() {}
    public getMeta(): Promise < Object > {
        return new Promise((resolve, reject) => {
            if (!this.meta) {
                this.http.get('assets/data/meta.json')
                    .map((response: Response) => {
                        let a = response.json().data;
                        return a;
                    })
                    .subscribe((data) => {
                        this.meta = data;
                        console.log(this.meta);
                        resolve(this.meta)
                    });
            } else {
                resolve(this.meta);
            }
        })

    }
}
