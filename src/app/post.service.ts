import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comicpost } from './comicpost.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Comicpost[] = [];
  postsUpdated = new Subject<Comicpost[]>();


  constructor() { }

  addPost(tempPost: Comicpost) {
    const newPost = {
      title: tempPost.title,
      issue: tempPost.issue,
      about: tempPost.about
    }
    this.posts.push(newPost);
    this.posts.sort((a, b) => {
      return a.issue - b.issue
    });
    const copiedPosts: Comicpost[] = [...this.posts];
    this.postsUpdated.next(copiedPosts);

  }

  getPosts() {
    return [...this.posts];
  }

  // getpostsUpdatedListener() {
  //   return this.postsUpdated.asObservable();
  // }
}

