import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseService {

    constructor(private http: Http) {}
    folder = 'assets/data/'
    _http(url) {
        return this.http.get(url)
            .map(response => < any[] > response.json().data);
    }


    dohvatiCjeline(predmet) {
        let url = this.folder + predmet + '.json';
        return this._http(url);

    }

    dohvatiLekcije(predmet, cjelina) {
        let url = this.folder + predmet + '/' + cjelina + '.json';
        return this._http(url);
    }

    dohvatiLekciju(predmet, cjelina, slag) {
        let url = this.folder + predmet + '/' + cjelina + '/' + slag + '.json';
        return this._http(url);
    }
}
