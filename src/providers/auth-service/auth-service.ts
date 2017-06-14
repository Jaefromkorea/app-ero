import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';


import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthServiceProvider {

  private authState;
  private userdata;
  private loading: any;
  private userauth;
  




  constructor(public http: Http,
    public storage: Storage,
    public afAuth: AngularFireAuth, 
    public db: AngularFireDatabase,
    public loadingCtrl: LoadingController) {


      this.authState = afAuth.authState;

    this.userdata = firebase.database().ref('/users/');
    this.housedata = firebase.database().ref('/houses/');
    this.profilepicdata = firebase.storage().ref().child('/profilepics/');
    this.housepicdata = firebase.storage().ref().child('/housepics/');
    
    console.log('Hello AuthServiceProvider Provider');
  }


LoadingControllerShow() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Please wait...',
    });
    this.loading.present();
  }


signInWithEmail(credentials): firebase.Promise<any> {
    return new Promise((resolve: () => void, reject: (reason: Error) => void) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((authData) => {
        this.userauth = authData;
        this.getUserData();
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }


LoadingControllerDismiss() {
    this.loading.dismiss();
}



}
