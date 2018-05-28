import { Component,OnInit } from '@angular/core';
import { DataService} from './data.service'


declare var moment:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  show:boolean = false;


  constructor(
    private dataService: DataService
   ) {

}
  toggleCollapse() {
    this.show = !this.show
  }



  ngOnInit(){

  }


}
