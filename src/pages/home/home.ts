import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from '../../service/login.service';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild("myNav") nav : NavController

  constructor(public navCtrl: NavController, private loginService : LoginService) {

  }

  goToListBikes(){
    this.nav.push(ListPage)
  }



}
