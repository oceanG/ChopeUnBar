import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {

  title;
  description;
  address;

  constructor(public navCtrl: NavController, public view: ViewController) {

  }

  saveItem(){

    let newItem = {
      title: this.title,
      description: this.description
    };

    this.view.dismiss(newItem);

  }

  close(){
    this.view.dismiss();
  }

}
