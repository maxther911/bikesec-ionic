import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Bike } from '../../models/bike';
import { BikeService } from '../../service/bikes.service';

@Component({
  selector: 'page-add-bike',
  templateUrl: 'add-bike.html',
})
export class AddBikePage {
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
    public toastCtrl: ToastController,
    public bikeService : BikeService) {
  }

  // Muestra mensaje en pantalla
  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present(toast);
  }

  addBike() {
    this.bikeService.addBike(this.bike);
    this.showToast("Bicicleta Adicionada con exito.");
    this.navCtrl.push("ListPage");
  }

}
