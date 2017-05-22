import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ListBarPage } from '../list-bar/list-bar';

declare var google;

@Component({
  selector: 'page-add-bar-detail',
  templateUrl: 'add-bar-detail.html'
})
export class AddBarDetailPage {

  place_id;
  place_detail;
  name;
  date_cub;
  nb_participant;
  marker;
  formatted_address;
  photo;
  service:any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.items = af.database.list('/cub');
  }

  ionViewDidLoad() {
    this.place_id = this.navParams.get('item').place_id;
    this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(48.861075, 2.335764);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    
    this.service = new google.maps.places.PlacesService(this.map);
    this.service.getDetails({placeId: this.place_id}, (data, status)=>{
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(data.name);
        this.name=data.name;
        this.place_detail=data;
        this.formatted_address=data.formatted_address;
        this.photo=data.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})
        this.marker = new google.maps.Marker({
        map: this.map,
        position: data.geometry.location
      });
      google.maps.event.addListener(this.marker);
      this.map.panTo(this.marker.getPosition());
      }
      //ToDo traiter le cas d'erreur 
    });



  }

  addBar() {
    this.items.push({ name: this.name, place_id: this.place_id, date: this.date_cub, nb_participant:this.nb_participant, formatted_address: this.place_detail.formatted_address, photo: this.place_detail.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) });
    console.log("AddBar");
    this.navCtrl.setRoot(ListBarPage);
  }

}
