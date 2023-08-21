import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import * as mockRaw from '../../../data/user.json'
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockUser:any = (mockRaw as any).default;
  let httpClientSpy: {post: jasmine.Spy}
  const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['set']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, HttpClientModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient',['post'])
    service = new AuthService(httpClientSpy as any,cookieServiceSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('debe retornar data  y token sesion',
  (done:DoneFn) => {

    // arrange
    const user:any = mockUser.userOk;
    const mockResponse = {
      data:{},
      tokenSession:'0x0x0x0x0x0'
    }
    httpClientSpy.post.and.returnValue(
      of(mockResponse)
    )

    // act

    service.sendCredentials(user.email,user.password).subscribe(responseApi => {
      const getProperties= Object.keys(responseApi)
      console.log(responseApi)
      expect(getProperties).toContain("data")
      expect(getProperties).toContain("tokenSession")
      done()
    })

  });
});
