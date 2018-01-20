import { Component, OnInit } from '@angular/core';

import { DataService} from '../data.service'

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject, Subject, AsyncSubject,ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

declare var moment:any;
declare var Plotly:any;


@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  xDataArray:any
  yDataArray:any
  zDataArray:any

  heute1 = moment('2017-01-01').format("YYYY-MM-DD");
  heute = moment(this.heute1);
  constructor(
           private dataService: DataService
          ) {
 
  }
    


  ngOnInit() {
  /*  this.xDataArray=[];
    this.yDataArray=[];
    this.zDataArray=[];
 
    this.dataService.fetchDay('2017-12-12').subscribe(data => {
    let results = data['feeds'];
    
    for (let e of results) {
        let created_at=moment(e.created_at);
        this.xDataArray.push(moment(created_at).format('HH'));
        this.yDataArray.push(moment(created_at).format('mm'));
        this.zDataArray.push(Number(e.field5))  //Raum
        };

        let myData = [
          {
            z: this.zDataArray,
            x: this.xDataArray,
            y: this.yDataArray,
            type: 'heatmap'
          }
        ];
        
        Plotly.plot('myDiv', myData);
        
      })*/
  }

}
