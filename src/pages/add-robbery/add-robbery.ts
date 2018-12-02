import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// librerias de google maps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

// my services
import { Bike } from '../../models/bike';
import { Robbery } from '../../models/robbery';
import { Coords } from '../../models/coords';
import { BikeService } from '../../service/bikes.service';
import { RobberyService } from '../../service/robbery.service';
// 
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-add-robbery',
  templateUrl: 'add-robbery.html',
})
export class AddRobberyPage {
  private map: GoogleMap;
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
    private robberyService: RobberyService,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
  }

  onButtonClick() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        })
        .then(() => {
          // add a marker
          let marker: Marker = this.map.addMarkerSync({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });

          // show the infoWindow
          marker.showInfoWindow();

          // If clicked it, display the alert
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            this.showToast('clicked!');
          });
        });
      });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
}

  addRobbery() {
    console.log("Nada")
    this.robberyService.addRobbery(this.robbery)
  }

  findBikeUsers() {
    console.log("buscando.....")
    this.bikeService.getBikesByUsersLike(this.user).subscribe(
      bikes => {
        this.bikes = bikes;
      });
  }

}