import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Params }   from '@angular/router';

@Component({
  selector: 'app-lekcije',
  templateUrl: './lekcije.component.html'
})
export class LekcijeComponent implements OnInit {
predmet;
cjelina;
lekcije;
meta = {
  predmet: this.predmet,
  cjelina: this.cjelina
}
  constructor(private db: DatabaseService,
    	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.forEach((params:Params)=>{
    		this.predmet = params['predmet']
    		this.cjelina = params['cjelina']
    	})
        this.db.dohvatiLekcije(this.predmet,this.cjelina)
            .subscribe(lekcije => this.lekcije = lekcije,
            	error => this.lekcije = [{"naslov":"Sadžaj nije dostupan"}]);
  }

}
