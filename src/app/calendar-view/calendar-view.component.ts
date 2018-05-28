import { Component,OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApplicationRef,NgZone } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

import { DataService} from '../data.service'

import {Subject, BehaviorSubject} from 'rxjs';
import {debounceTime} from 'rxjs/operator/debounceTime';

import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

declare var moment:any;

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;



const now = new Date();

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  view: string = 'month';
  model;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  date: {year: number, month: number};
  clickedDate: Date;
  private _success = new Subject<string>();

  staticAlertClosed = false;
  open=false;
  successMessage: string;
  otherMessage:string;

  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(calendar: NgbCalendar,
              private dataService: DataService) {
    this.fromDate = calendar.getToday();
    this.toDate = this.fromDate;
  }

  onDateChange(date: NgbDateStruct) {
    console.log(moment(date).format('LLLL'));
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  ngOnInit(){

    this._success.subscribe((message) => {
      console.log(message);
      this.successMessage = message
     });

    debounceTime.call(this._success, 5000).subscribe(() => {
      console.log("Subscribe");
      this.successMessage=null;
     });
 
  }


  newDates(){
    this.dataService.sendCommand("reset");

    console.log(this.fromDate);
    console.log(this.toDate);

    if(typeof(this.toDate)=='undefined') {
      this.toDate=this.fromDate;

    }

    let from=moment(this.fromDate.year+"-"+this.fromDate.month+"-"+this.fromDate.day,"YYYY-MM-DD").format('YYYY-MM-DD');
    let to=moment(this.toDate.year+"-"+this.toDate.month+"-"+this.toDate.day,"YYYY-MM-DD").format('YYYY-MM-DD');

    console.log(from);
    console.log(to);
    
   this.dataService.loadData(from,to);
  }

  fastFetchDates(){
    console.log(this.fromDate);
    console.log(this.toDate);
    
    this.dataService.sendCommand("reset");

    if(typeof(this.toDate)=='undefined') {
      this.toDate=this.fromDate;
    }

    let from=moment(this.fromDate.year+"-"+this.fromDate.month+"-"+this.fromDate.day,"YYYY-MM-DD").format('YYYY-MM-DD');
    let to=moment(this.toDate.year+"-"+this.toDate.month+"-"+this.toDate.day,"YYYY-MM-DD").format('YYYY-MM-DD');

    console.log(from);
    console.log(to);
    
   this.dataService.fastFetchData(from,to);
  }

  addDates(){
    console.log(this.fromDate);
    console.log(this.toDate);

    if(typeof(this.toDate)=='undefined') {
      this.toDate=this.fromDate;
    }

    let from=moment(this.fromDate.year+"-"+this.fromDate.month+"-"+this.fromDate.day,"YYYY-MM-DD").format('YYYY-MM-DD');
    let to=moment(this.toDate.year+"-"+this.toDate.month+"-"+this.toDate.day,"YYYY-MM-DD").format('YYYY-MM-DD');

    console.log(from);
    console.log(to);
    
   this.dataService.loadData(from,to);
  }


  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  dayClicked(event) {
    console.log(event);
    this.otherMessage='Hallo';
    this._success.next(`${new Date()} - Message successfully changed.`);
    //this._success.next(event.day.date);
  }

  deleteMessage() {
     this.successMessage=null;

  }
}

