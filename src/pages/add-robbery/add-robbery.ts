import { Component, AfterViewInit } from '@angular/core';
import { NavController, LoadingController, IonicPage } from 'ionic-angular';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
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
import { Observable } from 'rxjs';
import { ListPage } from '../list/list';
import { AlertWindowPage } from '../alert-window/alert-window';

@Component({
  selector: 'page-add-robbery',
  templateUrl: 'add-robbery.html',
})
export class AddRobberyPage implements AfterViewInit {

  map: GoogleMap;
  public zoom: number = 16;
  public activateFindUsersBike: boolean = true;
  public user: string = '';
  public bikes: Bike[];
  userBikes: Observable<Bike[]>;
  private robbery: Robbery;
  public hora: string;
  public fecha: string;
  public coords: Coords;

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
    public bikeService: BikeService,
    private robberyService: RobberyService,
    public toastCtrl: ToastController,
    private googleMaps: GoogleMaps,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      controls: {
        'compass': false,
        'myLocationButton': true,
        'myLocation': true,
        'indoorPicker': true,
        'zoom': true,
        'mapToolbar': true
      },
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.getPosition();
      })
      .catch(error => {
        this.showToast(error);
      });

  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.coords = {
          lat: response.latLng.lat,
          lng: response.latLng.lng
        }
        this.map.addMarker({
          title: 'Ubicación de hurto',
          snippet: 'Verifique su ubicación para reportar el hurto',
          position: response.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onButtonClick(event: any) {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        this.map.animateCamera({
          target: location.latLng,
          zoom: 16,
          tilt: 30
        })
          .then(() => {
            let marker: Marker = this.map.addMarkerSync({
              title: 'Ubicación de hurto',
              snippet: 'Verifique su ubicación para reportar el hurto',
              position: location.latLng,
              animation: GoogleMapsAnimation.BOUNCE
            });
            marker.showInfoWindow();
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              this.showToast('Sus coordenadas: ' + location.latLng);
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
    this.robberyService.addRobbery(this.robbery)
    this.showToast("Se ha registrado correctamente el hurto.");
    this.navCtrl.push(AlertWindowPage);
  }

  findBikeUsers(ev: any) {
    const userSearch = ev.target.value;
    if (userSearch) {
      this.bikeService.getBikesByUser(userSearch);
    }
  }

  presentLoading(message: string) {
    const loader = this.loadingCtrl.create({
      content: message,
      duration: 3000
    });
    loader.present();
  }

  ngAfterViewInit() {
    if (this.bikes == null)
      this.activateFindUsersBike = false;
  }

  selectBike(bike: Bike) {
    //this.showToast("Se ha seleccionado la bicicleta: " + bike.marca);
    this.bike = bike;
    this.activateFindUsersBike = true;
  }
}