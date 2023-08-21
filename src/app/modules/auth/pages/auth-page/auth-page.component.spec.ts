import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule,ReactiveFormsModule],
      declarations: [ AuthPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // todo: para para hacer pruebas
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // si el formulario es invalido
  it( 'Si el formulario es invalido', ()=>{

    // TODO: AARRANGE
    const mockCredentials = {
      email:'0x0x0x0x0x0x0',
      password:'12345678901234567'
    }

    const emailForm:any = component.formLogin.get("email")
    const passForm:any = component.formLogin.get("password")

    //ACT

    emailForm.setValue(mockCredentials.email);
    passForm.setValue(mockCredentials.password);


    //ASSERT

    expect(component.formLogin.invalid).toEqual(true);
  } )

  // si el formulario es valido

    it( 'Si el formulario es valido', ()=>{

    // TODO: AARRANGE
    const mockCredentials = {
      email:'test@test.com',
      password:'12345678'
    }

    const emailForm:any = component.formLogin.get("email")
    const passForm:any = component.formLogin.get("password")

    //ACT

    emailForm.setValue(mockCredentials.email);
    passForm.setValue(mockCredentials.password);


    //ASSERT

    expect(component.formLogin.valid).toEqual(true);
  } )

  it('El boton deberia de tener la palabra  Iniciar sesion ' ,()=>{
    const elementRef = fixture.debugElement.query(By.css(".form-action button"))
    const getInnerText = elementRef.nativeElement.innerText;

    expect(getInnerText).toEqual("Iniciar sesión")
  })

});
