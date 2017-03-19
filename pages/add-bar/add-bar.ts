import { Component, OnInit } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';

import { AddBarDetailPage } from '../add-bar-detail/add-bar-detail';

declare var google: any;

@Component({
  selector: 'page-add-bar',
  templateUrl: 'add-bar.html'
})
export class AddBarPage implements OnInit {


    autocompleteItems: any;
    autocomplete: any;
    acService:any;
    placesService: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController) {

  }
    ngOnInit() {
        this.acService = new google.maps.places.AutocompleteService();        
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };        
    }

    chooseItem(item: any) {
        console.log('modal > chooseItem > item > ', item);
        this.navCtrl.push(AddBarDetailPage, {
        item: item
        });
    }

    updateSearch() {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let self = this;
        let config = { 
            types:  ['establishment'], // other types available in the API: 'geocode', 'establishment', 'regions', and 'cities'
            input: this.autocomplete.query, 
            componentRestrictions: { country: 'FR' } 
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];            
            predictions.forEach(function (prediction) {              
                self.autocompleteItems.push(prediction);
            });
        });
    }

}
