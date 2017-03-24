import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { BarDetailPage } from '../bar-detail/bar-detail';


@Component({
  selector: 'page-next-bar',
  templateUrl: 'next-bar.html'
})
export class NextBarPage {

  //public items;
  items: FirebaseListObservable<any>;
  //item;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.items = af.database.list('/cub', {
      query: {
        limitToLast: 1,
        orderByChild: 'date'
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextBarPage');
  }
  viewItem(item){
    this.navCtrl.push(BarDetailPage, {
      item: item
    });
  }

}
