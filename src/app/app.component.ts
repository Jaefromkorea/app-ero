import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen} from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';


//provider
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

//pages

import { LoginPage } from '../pages/login/login';

//menu
import { BeerPage } from '../pages/beer/beer';
import { FoodPage } from '../pages/food/food';
import { CocktailPage } from '../pages/cocktail/cocktail';
import { LogoutPage } from '../pages/logout/logout';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  
  pages: Array<{title: string, component: any, icon: string, color: string, showloader: boolean}>;
  logoutpages: Array<{title: string, component: any, icon: string, color: string}>;
  

 @ViewChild(Nav) nav: Nav;



  constructor(platform: Platform, statusBar: StatusBar,
   splashScreen: SplashScreen,
   
    public alertCtrl: AlertController,
    public storage: Storage,
    public auth: AuthServiceProvider) {

         // app menu
      this.pages = [
      { title: 'Beer', component: BeerPage, icon: 'ios-browsers-outline', color: '', showloader: false },
      { title: 'Cocktail', component: CocktailPage, icon: 'ios-color-wand-outline', color: '', showloader: false  },
      { title: 'Food', component: FoodPage, icon: 'ios-attach-outline', color: '', showloader: true  }, 
    ];
    this.logoutpages = [
      { title: 'Logout', component: LogoutPage, icon: 'md-log-out', color: '#f53d3d', }
    ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //console.log('Cancel RemoveUser clicked');
          }
        },
        {
          text: 'Sign Out',
          handler: () => {
            try {
              this.auth.signOut();
            } catch(error){
              console.log(error);
            }            
            this.nav.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
          }
        }
      ]
    });
    alert.present();
  }
  
  
}

