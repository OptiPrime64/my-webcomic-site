import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comicpost } from './comicpost.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Comicpost[] = [];
  postUpdated = new Subject<Comicpost>();


  constructor() { }

  addPost(tempPost: Comicpost) {
    const newPost = {
      title: tempPost.title,
      about: tempPost.about
    }
    this.posts.push(newPost);
    const copiedPosts: Comicpost[] = [...this.posts];
    this.postUpdated.next(copiedPosts[copiedPosts.length -1])

  }

  getPost() {
    const allPosts = [...this.posts]
    const newPost = allPosts[allPosts.length - 1];
    return newPost;
  }

  // getpostsUpdatedListener() {
  //   return this.postsUpdated.asObservable();
  // }
}

