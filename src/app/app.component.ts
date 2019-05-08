import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'panel';

  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyDIHaSBBEcjhQwmSTjAN5raVG7I3luj1Ag",
    //   authDomain: "mypanelhub.firebaseapp.com"
    // });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
