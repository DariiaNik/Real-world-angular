import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, Subscription, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user-interface';
import { Profile } from 'src/app/shared/models/profile-interface';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  changingValue: Subject<string> = new Subject();
  subscriptions: Subscription[] = [];
  profile!: Profile;
  user!: User;
  disabled: boolean = false;
  name!: any;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getProfile();
  }

  private getUser() {
    const getUserSubscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.subscriptions.push(getUserSubscription);
  }

  private getProfile() {
    const getProfileSubscription = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.profileService.getProfile(params['username']);
        })
      )
      .subscribe((response) => {
        this.profile = response.profile;
      });

    this.subscriptions.push(getProfileSubscription);
  }

  public getType(type: string) {
    this.changingValue.next(type);
    console.log(type);
  }

  public following(username: string) {
    this.disabled = true;
    const followSubscription: Subscription = this.profileService.followUser(username).subscribe(() => {
      this.getProfile();
      this.disabled = false;
    });
    this.subscriptions.push(followSubscription);
  }

  public unFollowing(username: string) {
    this.disabled = true;
    const unFollowSubscription: Subscription = this.profileService.unFollowUser(username).subscribe(() => {
      this.getProfile();
      this.disabled = false;
    });
    this.subscriptions.push(unFollowSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
