import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Bike } from '../models/bike';
import { AuthService } from './auth.service';

@Injectable()
export class BikeService {
  private bikesCollection: AngularFirestoreCollection<Bike>;
  bikes: Observable<Bike[]>;
  bikesUsers: Observable<Bike[]>;
  bikesUsersRobb: Observable<Bike[]>;
  uid: string;
  private bike: Bike = {
    uid: '', nickName: '', id: '', marca: '', modelo: '', serial: '', color: '', rin: '', tipo: '', talla: '', description: '', image: ''
  };
  bikeDoc: AngularFirestoreDocument<Bike>;

  constructor(public afs: AngularFirestore, public auth: AuthService) {
    this.bikesCollection = this.afs.collection('bikes');
    this.bikes = this.bikesCollection.valueChanges();
  }

  getBikes() {
    return this.bikes;
  }

  getBikesByUID() {
    this.auth.user.subscribe(userLogin => {
      this.bikesCollection = this.afs.collection('bikes', ref => ref.where('uid', '==', userLogin.uid))
      this.bikesUsers = this.bikesCollection.valueChanges()
    })
  }

  getBikesByUsers() {
    this.auth.user.subscribe(user => {
      this.bike.nickName = user.email.split('@')[0];
      this.bikesCollection = this.afs.collection('bikes', ref => ref.where('nickName', '==', this.bike.nickName))
      this.bikesUsers = this.bikesCollection.valueChanges()
    })
    return this.bikesUsers;
  }

  getBikesByUser(userApp: string) {
      this.bikesCollection = this.afs.collection('bikes', ref => ref.where('nickName', '==', userApp))
      this.bikesUsersRobb = this.bikesCollection.valueChanges()
  }

  getBikeBySerial(serial: string) {
    this.bikesCollection = this.afs.collection('bikes', ref => ref.where('serial', '==', serial))
    this.bikesUsers = this.bikesCollection.valueChanges()
  }

  addBike(bike: Bike) {
    this.bikesCollection.add(bike);
  }

  deleteBike(bike: Bike) {
    this.bikeDoc = this.afs.doc(`bikes/${bike.id}`);
    this.bikeDoc.delete();
  }

  updateBike(bike: Bike) {
    this.bikeDoc = this.afs.doc(`bikes/${bike.id}`);
    this.bikeDoc.update(bike);
  }
}