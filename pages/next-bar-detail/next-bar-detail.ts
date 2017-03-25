import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-next-bar-detail',
  templateUrl: 'next-bar-detail.html'
})
export class NextBarDetailPage {


  name;
  date;
  nb_participant;
  formatted_address;
  photo;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  service:any;
  marker;
  place_id;
  myposition;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.name = this.navParams.get('item').name;
    this.place_id = this.navParams.get('item').place_id;
    this.date = this.navParams.get('item').date;
    this.nb_participant = this.navParams.get('item').nb_participant;
    this.formatted_address = this.navParams.get('item').formatted_address;
    this.photo = this.navParams.get('item').photo;
    this.loadMap();
    this.getPosition();
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
  
  getPosition(){
Geolocation.getCurrentPosition().then((resp) => {
  this.myposition = new google.maps.Marker({
        map: this.map,
        position: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)
      });
 // resp.coords.latitude
 // resp.coords.longitude
 google.maps.event.addListener(this.myposition);
 console.log('Get location success', resp);
}).catch((error) => {
  console.log('Error getting location', error);
});

  }

}
