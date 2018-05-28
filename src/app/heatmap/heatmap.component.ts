import { Component,Input, OnInit } from '@angular/core';

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

  traces:any;
  
  raumDataArray:any
  aussenDataArray:any
  heizkoerperDataArray:any
  vorlaufDataArray:any
  ruecklaufDataArray:any

  myData;
  myOptions;

  heute1 = moment('2017-01-01').format("YYYY-MM-DD");
  heute = moment(this.heute1);
  constructor(
           private dataService: DataService
          ) {
 
  }
    


  ngOnInit() {
    
    this.xDataArray=[];
    this.yDataArray=[];
    this.zDataArray=[];

    this.raumDataArray=[];
    this.aussenDataArray=[];
    this.heizkoerperDataArray=[];
    this.vorlaufDataArray=[];
    this.ruecklaufDataArray=[];

    


    this.myData = [
      {
        z: this.zDataArray,
        x: this.xDataArray,
        y: this.yDataArray,
        type: 'heatmap'
        
      }
    ];
    
   // Plotly.plot('myDiv', this.myData);

   this.dataService.currentCommand$.subscribe(data => {
   if (data=="reset") {
    this.xDataArray=[];
    this.yDataArray=[];
    this.zDataArray=[];

    this.raumDataArray=[];
    this.aussenDataArray=[];
    this.heizkoerperDataArray=[];
    this.vorlaufDataArray=[];
    this.ruecklaufDataArray=[];
   }

  })



 
    this.dataService.currentData$.subscribe(data => {
    if(data==null)
       return;
    let width = document.getElementById('myDiv').offsetWidth;
    let height= width=0.6;

    let results = data;

    console.log("Heatmap Start");
    console.log(results.length);
    
    for (let e of results) {
        let created_at=moment(e.created_at);
        this.xDataArray.push(moment(created_at).format('YYYY-MM-DD HH:00'));
        //this.xDataArray.push(e.entry_id);
        this.yDataArray.push(e.minute);
         
        this.raumDataArray.push(e.raum);
        this.aussenDataArray.push(e.aussen);
        this.heizkoerperDataArray.push(e.heizkoerper);
        this.vorlaufDataArray.push(e.vorlauf);
        this.ruecklaufDataArray.push(e.ruecklauf);


        this.zDataArray=this.aussenDataArray;  //Raum
        };
        
        this.myData=[];

        this.myData = [
          {
            z: this.zDataArray,
            x: this.xDataArray,
            y: this.yDataArray,
            type: 'heatmap',
            autoscale:true,
            zsmooth:false,
            //colorscale: 'Electric',
            colorscale: 'Portland',
            connectgaps: false,
            
           }
        ];

        this.myOptions= {
          xaxis: {type: 'date',
          autorange: true},
     //     height:hight,
     //     width:width
          
        }

        //console.log(this.myData);

        Plotly.newPlot('myDiv',this.myData,this.myOptions);

        
      })
  }

  plotRaum() {
    this.zDataArray=this.raumDataArray;
    this.myData = [
      {
        z: this.zDataArray,
        x: this.xDataArray,
        y: this.yDataArray,
        type: 'heatmap',
        colorscale: 'Portland',
       }
    ];

    Plotly.newPlot('myDiv',this.myData,this.myOptions);
   }

   plotVorlauf() {
    this.zDataArray=this.vorlaufDataArray;
    this.myData = [
      {
        z: this.zDataArray,
        x: this.xDataArray,
        y: this.yDataArray,
        type: 'heatmap',
        colorscale: 'Portland',
       }
    ];

    Plotly.newPlot('myDiv',this.myData,this.myOptions);
   }
   plotRuecklauf() {
    this.zDataArray=this.ruecklaufDataArray;
    this.myData = [
      {
        z: this.zDataArray,
        x: this.xDataArray,
        y: this.yDataArray,
        type: 'heatmap',
        colorscale: 'Portland',
       }
    ];

    Plotly.newPlot('myDiv',this.myData,this.myOptions);
   }
   plotHeizkoerper() {
    this.zDataArray=this.heizkoerperDataArray;
    this.myData = [
      {
        z: this.zDataArray,
        x: this.xDataArray,
        y: this.yDataArray,
        type: 'heatmap',
        colorscale: 'Portland',
       }
    ];

    Plotly.newPlot('myDiv',this.myData,this.myOptions);
   }
   plotAussen() {
    this.zDataArray=this.aussenDataArray;
    this.myData = [
      {
        z: this.zDataArray,
        x: this.xDataArray,
        y: this.yDataArray,
        type: 'heatmap',
        colorscale: 'Portland',
       }
    ];

    Plotly.newPlot('myDiv',this.myData,this.myOptions);
   }




}
