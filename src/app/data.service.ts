import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject, Subject, AsyncSubject,ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

declare var moment:any
declare var loki:any
declare var LokiIndexedAdapter: any;


@Injectable()
export class DataService {

  results = [];
  dbStore: any;
  dbMem: any;
  colValues: any;
  colDays: any;

  idbAdapter = new LokiIndexedAdapter('wohnzimmer');


  private dataSource = new ReplaySubject<any[]>(null);
  currentData$ = this.dataSource.asObservable();

  private commandHeatmap = new Subject<any>();
  currentCommand$ = this.commandHeatmap.asObservable();




  constructor(private http: HttpClient) {
    console.log("DataService");
    this.dbStore=new loki('wohnzimmer_data.db',{
      adapter : this.idbAdapter,
      autoload:true,
      autoloadCallback : this.databaseInitialize,
      autosave: false,
      autosaveInterval: 4000
       });

      this.dbMem= new loki('wohnzimmer_mem.db');

      }

      databaseInitialize = () =>{
        console.log("initDatabes");

        this.colValues=this.dbStore.getCollection("values");
        if (this.colValues===null) {
          console.log("New initializes");
          this.colValues=this.dbStore.addCollection("values",
             {indices:['year','month','day','timestamp']});
        }

        this.colDays=this.dbStore.getCollection("days");
        if (this.colDays===null) {
          console.log("New initializes");
          this.colDays=this.dbStore.addCollection("days");
        }

       //this.insertDayDatabase('2018-01-26');

  }


  loadData(start, end) {

    let currentDate=moment(start);
    let endDate=moment(end);
    this.insertDayDatabase(moment(currentDate).format("YYYY-MM-DD"));

    let nextDay=moment.utc(start).add(1,'days')

    while ( nextDay.isBefore(endDate) ){
      console.log(nextDay.format('YYYY-MM-DD'));
      this.insertDayDatabase(nextDay.format("YYYY-MM-DD"));
      nextDay.add(1,'days')
       }
  }

  fastFetchData(start,end) {
    let startDate=moment(start).format('x');
    let endDate=moment(end).format('x');
    let array=[];
    array=this.colValues.find({timestamp: {'$between':[startDate,endDate]}},)
    this.dataSource.next(array);
  }




  reloadDayDatabase(day) {
    let start=moment.utc(day).format('YYYY-MM-DD');
    let startYear=moment(start).format('YYYY');
    let startDay=moment(start).format('DD');
    let startMonth=moment(start).format('MM');

    this.colValues.findAndRemove({year:startYear,month:startMonth, day:startDay})

    this.insertDayDatabase(day);

  }

  sendCommand(command) {
    this.commandHeatmap.next(command);
  }


  insertDayDatabase(day) {

    let start=moment.utc(day).format('YYYY-MM-DD');
    let end=moment.utc(start).add(1,'day');

    let now=moment.utc();

    if(moment(now).isBefore(end)){
      end=now;
    }

    let startYear=moment(start).format('YYYY');
    let startDay=moment(start).format('DD');
    let startMonth=moment(start).format('MM');


    let converted=moment(start).format('X');
    console.log(converted);
    console.log(new moment.unix(converted).format('LLLL'));

      let param="start="+moment(start).format('YYYY-MM-DD%20hh:mm:ss')+"&end="+moment(end).format('YYYY-MM-DD%20hh:mm:ss');
      console.log(param)

      let array=[];
      array=this.colValues.find({year:startYear,month:startMonth, day:startDay})

      if(array.length!=0) {
        this.dataSource.next(array);
        console.log("From Database");
      }
      else  {

        this.http.get('https://api.thingspeak.com/channels/59862/feeds.json?'+param).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['feeds'];

      let lastMinute=-1;
      for (let e of this.results) {
        let created_at=moment(e.created_at);

        if(moment(created_at).format('mm')==lastMinute) {

        }
        else {

        let obj={
          created_at:e.created_at,
          entry_id:Number(e.entry_id),
          timestamp: moment(created_at).format('x'),
          year: moment(created_at).format('YYYY'),
          month: moment(created_at).format('MM'),
          day: moment(created_at).format('DD'),
          hour: moment(created_at).format('HH'),
          minute: moment(created_at).format('mm'),
          second: moment(created_at).format('ss'),
          vorlauf:Number(e.field2),
          ruecklauf:Number(e.field1),
          raum:Number(e.field3),
          heizkoerper:Number(e.field6),
          aussen:Number(e.field5)
          };
          array.push(obj)
          this.colValues.insert(obj);

          lastMinute=moment(created_at).format('mm');
        }


    }

    this.dataSource.next(array);
    console.log("Daten eingefügt");

    this.dbStore.saveDatabase(function(err) {
      if (err) {
        console.log("error : " + err);
      }
      else {
        console.log("database saved.");
      }
    });


    }); //Subscribe get
   }
  }


  fetchAll() {
    let array=[];
    array=this.colValues.find({})
    this.dataSource.next(array);

  }


  fetchDay(day) {

    let start=moment.utc(day).format('YYYY-MM-DD');
    let end=moment.utc(start).add(1,'day');


    let converted=moment(start).format('X');
    console.log(converted);
    console.log(new moment.unix(converted).format('LLLL'));

      let param="start="+moment(start).format('YYYY-MM-DD%20hh:mm:ss')+"&end="+moment(end).format('YYYY-MM-DD%20hh:mm:ss');
      console.log(param)

     return this.http.get('https://api.thingspeak.com/channels/59862/feeds.json?'+param);





  }

}
