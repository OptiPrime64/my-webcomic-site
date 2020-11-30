import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  authSub: Subscription;
  posts: Comicpost[] = [];
  private postsSub: Subscription;

  constructor(private postsService: PostService,
    private authService: AuthService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.isAuth = this.authService.isAuthenticated;
    console.log(this.isAuth);
    this.postsSub = this.postsService.postsUpdated.subscribe(newPosts => {
      this.posts = newPosts;
    });
    this.authSub = this.authService.isAuthenticatedOb.subscribe(isAuth => {
      this.isAuth = isAuth;
      console.log(isAuth);
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authSub.unsubscribe();
  }

}
