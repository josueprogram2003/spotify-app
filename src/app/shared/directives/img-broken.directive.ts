import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() imgDefault:string = '';
  // El host listener me ayuda a capturar un evento en si en este caso el error de la carga de imagen
  @HostListener('error') handleError():void{
    // console.log("Esta imagen revento", this.elhost)
    const nativeElement = this.elhost.nativeElement;
    nativeElement.src =this.imgDefault
  }
// El host listener me ayuda a capturar un evento en si en este caso el click a una imagen
   @HostListener('click', ['$event']) handleClick(btn:Event):void{
    console.log("Click", this.elhost,btn)
  }
  constructor(private elhost: ElementRef ) { }

}
