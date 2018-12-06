import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../service/auth.service';
import { BikeService } from '../../service/bikes.service';
import { Bike } from '../../models/bike';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  bikes: Bike[];
  user: Observable<firebase.User>;
  public bikesUsers: Observable<Bike[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private bikeService: BikeService,
    public loadingCtrl: LoadingController) {
      this.presentLoading('Cargando Bicicletas, por favor espere');
    this.auth.user.subscribe(user => {
      if (user) {
        this.user = this.auth.user;
          this.bikeService.getBikesByUID();
      } else {
        this.bikeService.getBikes().subscribe(bikes => {
          this.bikes = bikes;
        });
      }
    })
  }

  presentLoading(message: string) {
    const loader = this.loadingCtrl.create({
      content: message,
      duration: 3000
    });
    loader.present();
  }
}
