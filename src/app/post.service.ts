import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { Comicpost } from './comicpost.model';

const BACKEND_URL = environment.apiUrl + "/posts"

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Comicpost[] = [];
  postsUpdated = new Subject<Comicpost[]>();


  constructor(private http: HttpClient,
    private router: Router) { }

  addPost(clientPost: Comicpost) {
    const comicpostData = new FormData();
    const numToString = clientPost.issue.toString();
    comicpostData.append("title", clientPost.title);
    comicpostData.append("issue", numToString);
    comicpostData.append("about", clientPost.about);
    comicpostData.append("image", clientPost.imagePath, clientPost.title);

    this.http.post<{ message: string }>(BACKEND_URL, comicpostData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  getPosts() {
    this.http.get<{ message: string, comicposts: Comicpost[] }>(BACKEND_URL)
      .subscribe(
        (transformedPostData) => {
          this.posts = transformedPostData.comicposts;

          this.posts.sort((a, b) => {
            return a.issue - b.issue
          });
          this.postsUpdated.next([...this.posts]);
        }
      );
  }

  getPost(postId: string) {
    return this.http.get<Comicpost>(BACKEND_URL + '/' + postId);
  }

  updatePost(id: string, title: string, issue: number, about: string, image: File | string) {
    let comicpostData: Comicpost | FormData;
    if (typeof image === "object") {
      const numToString = issue.toString();
      comicpostData = new FormData();
      comicpostData.append("_id", id);
      comicpostData.append("title", title);
      comicpostData.append("issue", numToString);
      comicpostData.append("about", about);
      comicpostData.append("image", image, title);
    } else {
      comicpostData = {
        _id: id,
        title: title,
        imagePath: image,
        about: about,
        issue: issue
      };
    };

    this.http.put<{ message: string }>(BACKEND_URL + '/' + id, comicpostData)
      .subscribe(response => {
        console.log(response.message);
        this.getPosts();
        this.router.navigate(['/']);
      });
    // this.http.put<{ message: string }>('http://localhost:3000/api/posts/' + updatedPost._id, updatedPost)
    //   .subscribe(message => {
    //     this.getPosts();
    //     this.router.navigate(['/archive']);
    //   });
  }

  deletePost(postId: string) {
    this.http.delete<{ message: string }>(BACKEND_URL + '/' + postId)
      .subscribe(message => {
        this.getPosts();
      })
  }

}

