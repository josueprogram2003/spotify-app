import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksPageComponent } from './tracks-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TrackService } from '@modules/tracks/services/track.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SectionGenericComponent } from '@shared/components/section-generic/section-generic.component';

describe('TracksPageComponent', () => {
  let component: TracksPageComponent;
  let fixture: ComponentFixture<TracksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ TracksPageComponent,SectionGenericComponent ],
      providers: [TrackService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
