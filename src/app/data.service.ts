import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject, Subject, AsyncSubject,ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

declare var moment:any
declare var loki:any
declare var LokiIndexedAdapter :any


@Injectable()
export class DataService {

  results=[];
  dbStore:any;
  dbMem:any;
  colValues:any;
  colDays:any

  idbAdapter = new LokiIndexedAdapter('wohnzimmer');


  private dataSource = new ReplaySubject<any[]>(null);
  currentData$ = this.dataSource.asObservable();


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
             {indices:['year','month','day']});
        }

        this.colDays=this.dbStore.getCollection("days");
        if (this.colDays===null) {
          console.log("New initializes");
          this.colDays=this.dbStore.addCollection("days");
        }
     /*   this.insertDayDatabase('2017-07-01');
        this.insertDayDatabase('2017-07-02');
        this.insertDayDatabase('2017-07-03');
        this.insertDayDatabase('2017-07-04');
        this.insertDayDatabase('2017-07-05');
        this.insertDayDatabase('2017-07-06');
        this.insertDayDatabase('2017-07-07');
        this.insertDayDatabase('2017-07-08');
        this.insertDayDatabase('2017-07-09');
        this.insertDayDatabase('2017-07-10');
        this.insertDayDatabase('2017-07-11');
        this.insertDayDatabase('2017-07-12');
        this.insertDayDatabase('2017-07-13');
        this.insertDayDatabase('2017-07-14');*/


        /*this.insertDayDatabase('2017-10-15');
        this.insertDayDatabase('2017-10-16');
        this.insertDayDatabase('2017-10-17');
        this.insertDayDatabase('2017-10-18');
        this.insertDayDatabase('2017-10-19');
        this.insertDayDatabase('2017-10-20');
        this.insertDayDatabase('2017-10-21');
        this.insertDayDatabase('2017-10-22');
        this.insertDayDatabase('2017-10-23');
        this.insertDayDatabase('2017-10-24');
        this.insertDayDatabase('2017-10-25');
        this.insertDayDatabase('2017-10-26');
        this.insertDayDatabase('2017-10-27');
        this.insertDayDatabase('2017-10-28');
        this.insertDayDatabase('2017-10-29');
        this.insertDayDatabase('2017-10-30');
        this.insertDayDatabase('2017-10-31');*/



    /*    this.insertDayDatabase('2017-11-01');
        this.insertDayDatabase('2017-11-02');
        this.insertDayDatabase('2017-11-03');
        this.insertDayDatabase('2017-11-04');
        this.insertDayDatabase('2017-11-05');
        this.insertDayDatabase('2017-11-06');
        this.insertDayDatabase('2017-11-07');
        this.insertDayDatabase('2017-11-08');
        this.insertDayDatabase('2017-11-09');
        this.insertDayDatabase('2017-11-10');
        this.insertDayDatabase('2017-11-11');
        this.insertDayDatabase('2017-11-12');
        this.insertDayDatabase('2017-11-13');
        this.insertDayDatabase('2017-11-14');
        this.insertDayDatabase('2017-11-15');
        this.insertDayDatabase('2017-11-16');
        this.insertDayDatabase('2017-11-17');
        this.insertDayDatabase('2017-11-18');
        this.insertDayDatabase('2017-11-19');
        this.insertDayDatabase('2017-11-20');
        
        this.insertDayDatabase('2017-11-21');
        this.insertDayDatabase('2017-11-22');
        this.insertDayDatabase('2017-11-23');
        this.insertDayDatabase('2017-11-24');
        this.insertDayDatabase('2017-11-25');
        this.insertDayDatabase('2017-11-26');
        this.insertDayDatabase('2017-11-27');
        this.insertDayDatabase('2017-11-28');
        this.insertDayDatabase('2017-11-29');
        this.insertDayDatabase('2017-11-30');

        this.insertDayDatabase('2017-12-01');
        this.insertDayDatabase('2017-12-02');
        this.insertDayDatabase('2017-12-03');
        this.insertDayDatabase('2017-12-04');
        this.insertDayDatabase('2017-12-05');
        this.insertDayDatabase('2017-12-06');
        this.insertDayDatabase('2017-12-07');
        this.insertDayDatabase('2017-12-08');
        this.insertDayDatabase('2017-12-09');
        this.insertDayDatabase('2017-12-10');
        this.insertDayDatabase('2017-12-11');
        this.insertDayDatabase('2017-12-12');
        this.insertDayDatabase('2017-12-13');
        this.insertDayDatabase('2017-12-14');
        this.insertDayDatabase('2017-12-15');
        this.insertDayDatabase('2017-12-16');
        this.insertDayDatabase('2017-12-17');
        this.insertDayDatabase('2017-12-18');
        this.insertDayDatabase('2017-12-19');
        this.insertDayDatabase('2017-12-20');
        this.insertDayDatabase('2017-12-21');
        this.insertDayDatabase('2017-12-22');
        this.insertDayDatabase('2017-12-23');
        this.insertDayDatabase('2017-12-24');
        this.insertDayDatabase('2017-12-25');
        this.insertDayDatabase('2017-12-26');
        this.insertDayDatabase('2017-12-27');
        this.insertDayDatabase('2017-12-28');
        this.insertDayDatabase('2017-12-29');
        this.insertDayDatabase('2017-12-30');

        this.insertDayDatabase('2017-12-31');
        this.insertDayDatabase('2018-01-01');
        this.insertDayDatabase('2018-01-02');
        this.insertDayDatabase('2018-01-03');

        this.insertDayDatabase('2018-01-04');
        this.insertDayDatabase('2018-01-05');
        this.insertDayDatabase('2018-01-06');
        this.insertDayDatabase('2018-01-07');
        this.insertDayDatabase('2018-01-08');
        this.insertDayDatabase('2018-01-09');
        this.insertDayDatabase('2018-01-10');
        this.insertDayDatabase('2018-01-11');
        this.insertDayDatabase('2018-01-12');
        this.insertDayDatabase('2018-01-13');
        this.insertDayDatabase('2018-01-14');
        this.insertDayDatabase('2018-01-15');
        this.insertDayDatabase('2018-01-16');
        this.insertDayDatabase('2018-01-17');
        this.insertDayDatabase('2018-01-18');
        this.insertDayDatabase('2018-01-19');
        this.insertDayDatabase('2018-01-20'); */

        this.fetchAll();

        
  }

  insertDayDatabase(day) {

    let start=moment.utc(day).format('YYYY-MM-DD');
    let end=moment.utc(start).add(1,'day');

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
