import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject, Subject, AsyncSubject,ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

declare var moment:any
declare var loki:any

@Injectable()
export class DataService {

  results=[];
  dbStore:any;
  dbMem:any;
  colValues:any;
  colDays:any


  private dataSource = new BehaviorSubject<any[]>(null);
  currentData$ = this.dataSource.asObservable();


  constructor(private http: HttpClient) {
    console.log("DataService");
    this.dbStore=new loki('wohnzimmer_data.db',{
      autoload:true,
      autoloadCallback : this.databaseInitialize,
      autosave: true, 
      autosaveInterval: 4000
       });
            
      this.dbMem= new loki('wohnzimmer_mem.db');
     
      }
    
      databaseInitialize = () =>{
        console.log("initDatabes");
     
        this.colValues=this.dbStore.getCollection("values");
        if (this.colValues===null) {
          console.log("New initializes");
          this.colValues=this.dbStore.addCollection("values");
        }

        this.colDays=this.dbStore.getCollection("days");
        if (this.colDays===null) {
          console.log("New initializes");
          this.colDays=this.dbStore.addCollection("days");
        }
        this.insertDayDatabase('2017-12-12')
  }

  insertDayDatabase(day) {

    let start=moment.utc(day).format('YYYY-MM-DD');
    let end=moment.utc(start).add(1,'day');

    
    let converted=moment(start).format('X');
    console.log(converted);
    console.log(new moment.unix(converted).format('LLLL'));
   
      let param="start="+moment(start).format('YYYY-MM-DD%20hh:mm:ss')+"&end="+moment(end).format('YYYY-MM-DD%20hh:mm:ss');
      console.log(param)

      this.http.get('https://api.thingspeak.com/channels/59862/feeds.json?'+param).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['feeds'];
      let array=[];

      for (let e of this.results) {
        let created_at=moment(e.created_at);

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
          
          this.colValues.insert(obj);
    }
  
    console.log("Daten eingefügt");
 
    });
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
