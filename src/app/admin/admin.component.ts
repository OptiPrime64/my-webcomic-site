import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Comicpost } from '../comicpost.model';
import { PostService } from '../post.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  form: FormGroup;
  postId: string;
  mode: string = 'create';
  imagePreview: string;
  isAuthenticated: boolean = false;
  authSub: Subscription;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      issue: new FormControl(null, {
        validators: [Validators.required]
      }),
      about: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        console.log('Edit mode')
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId)
          .subscribe((postData: Comicpost) => {
            this.form.setValue({
              title: postData.title,
              issue: postData.issue,
              about: postData.about,
              image: postData.imagePath
            });
            this.imagePreview = postData.imagePath;
          });
      } else {
        console.log('Create mode')
        this.mode = 'create';
        this.postId = null;
      }
    })

    this.isAuthenticated = this.authService.isAuthenticated;
    this.authSub = this.authService.isAuthenticatedOb.subscribe(authState => {
      this.isAuthenticated = authState;
    })
  }

  onSavePost() {

    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      const tempPost: Comicpost = {
        title: this.form.value.title,
        issue: this.form.value.issue,
        about: this.form.value.about,
        imagePath: this.form.value.image
      };
      this.postService.addPost(tempPost);
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.issue,
        this.form.value.about,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
