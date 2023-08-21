import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css']
})
export class FavoritePageComponent implements OnInit{

  tracks: Array<TrackModel> = [];

  constructor(private _tracksService: TrackService){

  }

  ngOnInit(): void {
    this._tracksService.getAllTracks$().subscribe((data:any)=>this.tracks=data)
  }

}
