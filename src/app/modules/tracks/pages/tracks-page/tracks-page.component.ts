import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
// * esto funciona solo si en el tsconfig.json esta colocado  resolveJsonModule en true;


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit,OnDestroy {

  tracksTrending : Array<TrackModel> = []
  tracksRandom : Array<TrackModel> = []
  listObserver$ : Array<Subscription> = []
  constructor(private _tracksService: TrackService) {

  }
  ngOnDestroy(): void {
   this.listObserver$.forEach((data)=>data.unsubscribe())
  }

  ngOnInit(): void {
    this.loadDataAll()
    // this.loadDataRandom()
  }

  // tambien lo puedo tratar como si fuera una promesa
  async loadDataAll():Promise<any>{
    this.tracksTrending = await this._tracksService.getAllTracks$().toPromise();
    this.tracksRandom = await this._tracksService.getAllRandom$().toPromise();
    }


  /*loadDataRandom():void{
    const observer$2:Subscription = this._tracksService.getAllRandom$().subscribe((response)=>{
      console.log("data ---->",response)
      this.tracksRandom = response;
    })
  }*/


}
