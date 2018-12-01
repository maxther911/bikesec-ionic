import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// librerias de google maps
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, Environment } from '@ionic-native/google-maps';
import { Bike } from '../../models/bike';
import { Robbery } from '../../models/robbery';
import { Coords } from '../../models/coords';
import { BikeService } from '../../service/bikes.service';
import { RobberyService } from '../../service/robbery.service';

@Component({
  selector: 'page-add-robbery',
  templateUrl: 'add-robbery.html',
})
export class AddRobberyPage {
  map: GoogleMap;
  public lat: number = 4.643548;
  public lng: number = -74.1621109;
  public zoom: number = 16;
  public activateFindUsersBike: boolean = true;
  public user: string = '';
  public bikes: Bike[];
  private robbery: Robbery;
  public hora: string;
  public fecha: string;
  private coords: Coords;

  bike: Bike = {
    id: '',
    marca: '',
    modelo: '',
    serial: '',
    color: '',
    rin: '',
    tipo: '',
    talla: '',
    description: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private bikeService: BikeService, 
    private robberyService : RobberyService) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAKzuvYA5n2fzARWWlWVeE3VW27tBaMoZw',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAKzuvYA5n2fzARWWlWVeE3VW27tBaMoZw'
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  onButtonClick(event: any) {
    console.log(event);
  }

  addRobbery(){
    console.log("Nada")
  }

  findBikeUsers(){
    console.log("buscando.....")
    this.bikeService.getBikesByUsersLike(this.user).subscribe(
      bikes => {
        this.bikes = bikes;
      });
  }

}
