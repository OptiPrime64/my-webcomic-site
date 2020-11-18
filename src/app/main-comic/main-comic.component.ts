import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-comic',
  templateUrl: './main-comic.component.html',
  styleUrls: ['./main-comic.component.css']
})
export class MainComicComponent implements OnInit {

  comicTitle: string = 'Default';
  comicAbout: string = 'This is the latest comic I\'ve done';

  constructor() { }

  ngOnInit(): void {
  }

}
