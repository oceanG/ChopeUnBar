import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { BarDetailPage } from '../bar-detail/bar-detail';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-list-bar',
  templateUrl: 'list-bar.html'
})
export class ListBarPage {

   //public items;
   items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, af: AngularFire) {
  this.items = af.database.list('/cub', {
      query: {
        orderByChild: 'date'
      }
    });

  }

  ionViewDidLoad(){
  }

  viewItem(item){
    this.navCtrl.push(BarDetailPage, {
      item: item
    });
  }

}
