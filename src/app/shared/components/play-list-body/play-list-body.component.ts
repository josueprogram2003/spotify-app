import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit{

  @Input() tracks: Array<TrackModel> = [];
  optionSort:{property:string|null, order:string}={property:'name',order:'asc'}
  constructor(){

  }

  ngOnInit(): void {

  }

  public changeSort(property:string){
    const {order} = this.optionSort;
    this.optionSort = {
      property,
      order:order == 'asc' ? 'desc':'asc'
    }
    console.log(this.optionSort)
  }

}
