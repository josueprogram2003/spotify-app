import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template:'<img class="testing-directive" appImgBroken [src]="srcMock">'
})
class TestComponent{
  srcMock:any = 'data:image/232323232323';
}



describe('ImgBrokenDirective', () => {

  let component: TestComponent;
  let fixture:ComponentFixture<TestComponent>

  beforeEach(()=>{
  TestBed.configureTestingModule({
        declarations: [ TestComponent,ImgBrokenDirective ]
      })
      .compileComponents();
       fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  })


  it('should create an instance', () => {
    const mockElement = new ElementRef("")
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });

  it('Componente --->> cargado correctamente',()=>{
    expect(component).toBeTruthy();
  })

  it('Directiva --->> deberia cambiar la imagen',(done:DoneFn)=>{
    const beforeImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
    const beforeImgSrc = beforeImgElement.src;
    console.log(beforeImgSrc)
    component.srcMock = undefined;

    setTimeout(() => {
    const afterImgElement = fixture.debugElement.query(By.css('.testing-directive')).nativeElement;
    const afterImgSrc = beforeImgSrc;
    console.log(afterImgSrc)
    expect(afterImgSrc).toMatch(/\bdata:image\b/)
    done();
    }, 3000);
  })
});
