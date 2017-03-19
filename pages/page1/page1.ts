import { Component } from '@angular/core';

import { ModalController, NavController } from 'ionic-angular';

import { AddBarPage } from '../add-bar/add-bar';
import { BarDetailPage } from '../bar-detail/bar-detail';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

   //public items;
   items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, af: AngularFire) {
  this.items = af.database.list('/cub');

  }

  ionViewDidLoad(){
  }

  viewItem(item){
    this.navCtrl.push(BarDetailPage, {
      item: item
    });
  }

}
