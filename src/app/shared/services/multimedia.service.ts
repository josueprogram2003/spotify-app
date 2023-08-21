import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callbacks: EventEmitter<any> = new EventEmitter<any>();
  public tracksInfo$:BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(){
    this.audio = new Audio()
    this.tracksInfo$.subscribe((responseOk:any) =>{
      if (responseOk) {
        this.setAudio(responseOk)
      }
    })
    this.listenAllEvents()
  }

  private listenAllEvents():void{
    this.audio.addEventListener('timeupdate',this.calculatorTime,false)
    this.audio.addEventListener('playing',this.setPlayerStatus,false)
    this.audio.addEventListener('play',this.setPlayerStatus,false)
    this.audio.addEventListener('pause',this.setPlayerStatus,false)
    this.audio.addEventListener('ended',this.setPlayerStatus,false)
  }

  private setPlayerStatus = (state:any) =>{
    console.log(state)
    switch (state.type) {
      case 'playing':
      this.playerStatus$.next('playing');
        break;
      case 'play':
      this.playerStatus$.next('play');
      break;
      case 'ended':
      this.playerStatus$.next('ended');
      break;
      default:
        this.playerStatus$.next('pause')
        break;
    }
  }

  private calculatorTime=()=>{
    const {duration,currentTime}=this.audio;
    console.log("---------------")
    this.setTimeElapsed(currentTime)
    this.setRemaining(currentTime,duration);
    this.setPercentaje(currentTime,duration);
  }

   private setTimeElapsed(currentTime:number):void{
     let seconds = Math.floor(currentTime % 60) //TODO 1,2,3
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

   private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  private setPercentaje(currentTime:number, duration:number){
    let percentage = (currentTime*100)/duration;
    this.playerPercentage$.next(percentage);
  }

  public setAudio(track:TrackModel):void {
    this.audio.src=track.url;
    this.audio.play()
  }

  public togglePlayer():void{
    this.audio.paused ? this.audio.play(): this.audio.pause()
  }

   public seekAudio(percentage: number): void {
    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond

  }

}
