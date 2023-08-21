import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import * as dataRaw from '../../../data/track.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  // El of nos permite crear un observable desde cualquier tipo de datos
  // se coloca $ al final ya que en la comunidad se coloca $ a las variables que seran observables
  // dataTracksTrending$:Observable<TrackModel[]> = of([]);
  // dataTracksRandom$:Observable<TrackModel[]> = of([]);

  private readonly URL = environment.api;


  constructor(private httpClient:HttpClient) {
  }

  private skipById(listTrack:TrackModel[],id:number):Promise<TrackModel[]>{
    return new Promise((resolve,reject)=>{
      resolve(listTrack.filter(e => e._id !== id))
    })
  }

  getAllTracks$():Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(map((dataRaw:any)=>{
      return dataRaw.data
    }));
  }

  getAllRandom$():Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(mergeMap(({data}:any)=>
      this.skipById(data,1)
    ),
     catchError((err) => {
       const { status, statusText } = err;
       console.log([status,statusText])
      return of([])
    }));
  }

}
