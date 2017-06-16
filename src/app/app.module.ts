import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeerPage } from '../pages/beer/beer';
import { FoodPage } from '../pages/food/food';
import { CocktailPage } from '../pages/cocktail/cocktail';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { SignupPage } from '../pages/signup/signup';


//provider
import { AuthServiceProvider } from '../providers/auth-service/auth-service';



// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';



export const firebaseConfig = {
    apiKey: "AIzaSyD_WfcPALlykZOs20kEJzMMYXZTtlMoMu8",
    authDomain: "appero-6edac.firebaseapp.com",
    databaseURL: "https://appero-6edac.firebaseio.com",
    projectId: "appero-6edac",
    storageBucket: "appero-6edac.appspot.com",
    messagingSenderId: "875629347408"
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BeerPage,
    CocktailPage,
    FoodPage,
    ForgotPasswordPage,
    LoginPage,
    LogoutPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
     IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
   

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BeerPage,
    CocktailPage,
    FoodPage,
    ForgotPasswordPage,
    LoginPage,
    LogoutPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    AuthServiceProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
