import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from "@clr/angular";
import {HttpClientModule} from '@angular/common/http';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeatmapComponent,
    CalendarViewComponent
  ],
  imports: [
    BrowserModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    CommonModule,
    FormsModule,
   // ClarityModule.forRoot(),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
