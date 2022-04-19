import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/profile/profile.service';
import { Article } from 'src/app/shared/models/article-interface';
import { User } from 'src/app/shared/models/user-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  articles$!: Observable<Article[]>;
  user$!: Observable<User>;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.user$ = this.profileService.getUser();
    console.log(this.user$);
  }
}
