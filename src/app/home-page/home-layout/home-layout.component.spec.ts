import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { TagsService } from 'src/app/home-page/tags.service';
import { HomeLayoutComponent } from './home-layout.component';

describe('HomeLayoutComponent', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeLayoutComponent],
      providers: [
        {
          provide: AuthorizationService,
          useValue: {
            isAuthenticated: () => of(true),
          },
        },
        {
          provide: TagsService,
          useValue: {
            getTags: () => of(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Then: call clearTag ', () => {
    const componentSpy = spyOn(component, 'clearTag').and.callThrough();
    component.tagName$.subscribe;
    (message: string) => {
      expect(message).toBe('');
    };
    component.clearTag();
    expect(componentSpy).toHaveBeenCalled();
  });

  it('Then: call getTagName ', () => {
    const componentSpy = spyOn(component, 'getTagName').and.callThrough();
    const event = new Event('welcome');
    component.tagName$.subscribe;
    (message: string) => {
      expect(message).toBe('welcome');
    };
    component.getTagName(event);
    expect(componentSpy).toHaveBeenCalled();
  });
});
