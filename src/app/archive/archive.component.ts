import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit, OnDestroy {

  posts: Comicpost[] = [];
  private postsSub: Subscription;

  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.postsUpdated.subscribe(newPosts => {
      this.posts = newPosts;
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
