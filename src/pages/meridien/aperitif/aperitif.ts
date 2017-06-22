import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarhomePage } from '../../barhome/barhome';

import { AngularFireDatabase } from 'angularfire2/database';
 
import firebase from 'firebase';
declare var FCMPlugin;
/**
 * Generated class for the AperitifPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-aperitif',
  templateUrl: 'aperitif.html',
})
export class AperitifPage {
drinks = [
  {
    type: 'Beers',
    list: [
      { name: 'Heineken', explanation: 'wow',   price: 3.5, isChecked: false, quantity: 0 },
      { name: 'Pelfort', explanation: 'wow',    price: 3.5, isChecked: false, quantity: 0 }
    ]
  },
  {
    type: 'Cocktails',
    list: [
      { name: 'Pina Colada', explanation: 'wow',     price: 5, isChecked: false, quantity: 0 },
      { name: 'Mojito',   explanation: 'wow',        price: 5, isChecked: false, quantity: 0 }
    ]
  }];
  firestore = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/Orders');


  constructor(public navCtrl: NavController, public navParams: NavParams, public afd: AngularFireDatabase) {
    this.tokensetup().then((token) => {
      this.storetoken(token);
    })
  }

  
 ionViewDidLoad() {
   console.log('ionViewDidLoad AperitifPage');
    FCMPlugin.onNotification(function(data){
    if(data.wasTapped){
      //Notification was received on device tray and tapped by the user.
      alert( JSON.stringify(data) );
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      alert( JSON.stringify(data) );
    }
    });
 
  }
tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
    resolve(token);
      }, (err) => {
        reject(err);
});
    })
    return promise;
  }
 
  storetoken(t) {
    this.afd.list(this.firestore).push({
      uid: firebase.auth().currentUser.uid,
      devtoken: t
        
    }).then(() => {
      alert('Token stored');
      }).catch(() => {
        alert('Token not stored');
      })// i can delete 
 
    this.afd.list(this.firemsg).push({
      sendername: firebase.auth().currentUser.displayName,
      message: 'hello'
    }).then(() => {
      alert('Message stored');
      }).catch(() => {
        alert('Message not stored');
  })  
}


////////////////////////////////////////////////////////
sendOrder() {
    let items_ordered=[];
    this.drinks.forEach((o) => {
      o.list.forEach((d) => {
        (+d.quantity) > 0 && items_ordered.push({name: d.name, price: d.price, quantity: +(d.quantity)});
      });
    });
    this.navCtrl.push(BarhomePage, )// CUSTOMIZED FOR TESTING PURPOSES
  }
  

  
  checkOrder() {
    //return !document.querySelectorAll('.checkbox-checked').length;
    let qty_total:number = 0;
    this.drinks.forEach((o) => {
      o.list.forEach((d) => {
        qty_total += (+d.quantity);
      })
    })
    return qty_total === 0;
  }
  

}
