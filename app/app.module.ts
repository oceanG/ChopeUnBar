import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BarDetailPage } from '../pages/bar-detail/bar-detail';
import { AddBarPage } from '../pages/add-bar/add-bar';
import { AddBarDetailPage } from '../pages/add-bar-detail/add-bar-detail';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyCSMHjvvV0yZaHHVU4sl5oP45eMFyj5EEU",
  authDomain: "chopeunbar-d1d8c.firebaseapp.com",
  databaseURL: "https://chopeunbar-d1d8c.firebaseio.com",
  storageBucket: "chopeunbar-d1d8c.appspot.com",
  messagingSenderId: "674963098185"
};

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    BarDetailPage, 
    AddBarPage, 
    AddBarDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    BarDetailPage,
    AddBarPage,
    AddBarDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
