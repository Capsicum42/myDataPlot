import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClarityModule } from "@clr/angular";
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HeatmapComponent } from './heatmap/heatmap.component';


@NgModule({
  declarations: [
    AppComponent,
    HeatmapComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
