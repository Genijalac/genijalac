import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NaslovnaComponent } from './naslovna/naslovna.component';
import { CjelineComponent } from './cjeline/cjeline.component';
import { LekcijeComponent } from './lekcije/lekcije.component';
import { LekcijaComponent } from './lekcija/lekcija.component';
import { PovijestComponent } from './povijest/povijest.component';
import { YoutubeComponent } from './youtube/youtube.component';

@NgModule({
  declarations: [
    AppComponent,
    NaslovnaComponent,
    CjelineComponent,
    LekcijeComponent,
    LekcijaComponent,
    PovijestComponent,
    YoutubeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
