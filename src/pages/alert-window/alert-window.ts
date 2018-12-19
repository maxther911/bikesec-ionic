import { Bike } from './../../models/bike';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  Marker,
  ILatLng,
  Circle,
  Spherical
} from '@ionic-native/google-maps';
import { BikeService } from '../../service/bikes.service';
import { Coords } from '../../models/coords';
import { RobberyService } from '../../service/robbery.service';

/**
 * Generated class for the AlertWindowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alert-window',
  templateUrl: 'alert-window.html',
})
export class AlertWindowPage {
  private map: GoogleMap;
  public zoom: number = 16;
  public activateFindUsersBike: boolean = true;
  public user: string = '';
  public hora: string;
  public fecha: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bikeService: BikeService,
    private geolocation: Geolocation,
    private robberyService: RobberyService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let coords : Coords = {"lat": 4.6486259, "lng": -74.101417 };
    this.geolocation.getCurrentPosition().then((resp) => {
      coords = {
        lng: resp.coords.latitude,
        lat: resp.coords.longitude
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    let center: ILatLng = { "lat": coords.lat, "lng": coords.lng };

    let radius = 300;  // radius (meter)

    // Calculate the positions
    let positions: ILatLng[] = [0, 90, 180, 270].map((degree: number) => {
      return Spherical.computeOffset(center, radius, degree);
    });

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: positions,
        padding: 100
      }
    });

    let marker: Marker = this.map.addMarkerSync({
      position: positions[0],
      draggable: true,
      title: 'Drag me!'
    });
    let circle: Circle = this.map.addCircleSync({
      'center': center,
      'radius': radius,
      'strokeColor': '#AA00FF',
      'strokeWidth': 5,
      'fillColor': '#00880055'
    });

    marker.on('position_changed').subscribe((params: any) => {
      let newValue: ILatLng = <ILatLng>params[1];
      let newRadius: number = Spherical.computeDistanceBetween(center, newValue);
      circle.setRadius(newRadius);
    });
  }


  presentLoading(message: string) {
    const loader = this.loadingCtrl.create({
      content: message,
      duration: 3000
    });
    loader.present();
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle'
    });
    toast.present(toast);
  }

  selectBike(bike: Bike){
    
  }
}