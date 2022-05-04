import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CommentsService } from 'src/app/article-page/comment/comments.service';
import { UserService } from 'src/app/shared/services/user.service';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let commentsService: CommentsService;
  const comment = {
    comment: {
      id: 0,
      createdAt: '2022-05-04T07:18:45.996Z',
      updatedAt: '2022-05-04T07:18:45.996Z',
      body: 'string',
      author: {
        username: 'string',
        bio: 'string',
        image: 'string',
        following: true,
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CommentComponent],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            getComments: () => of(),
            deleteComment: () => of(),
            addComments: () => of(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: () => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    commentsService = TestBed.inject(CommentsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Function deleteComment', () => {
    it('Then: call deleteComment', () => {
      const componentSpy = spyOn(component, 'deleteComment').and.callThrough();
      component.deleteComment(1);
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call commentsService from deleteComment', fakeAsync(() => {
      const serviceSpy = spyOn(commentsService, 'deleteComment').and.returnValue(of({}));
      component.deleteComment(1);
      expect(serviceSpy).toHaveBeenCalled();
    }));
  });

  describe('Function postComment', () => {
    it('Then: call postComment', () => {
      const componentSpy = spyOn(component, 'postComment').and.callThrough();
      component.postComment();
      expect(component.disabled).toBe(true);
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call commentsService in  postComment', fakeAsync(() => {
      const serviceSpy = spyOn(commentsService, 'addComments').and.returnValue(of(comment.comment));
      component.postComment();
      expect(serviceSpy).toHaveBeenCalled();
    }));
  });
});
