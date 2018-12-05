import { Injectable } from '@angular/core';
import { Robbery } from '../models/robbery';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class RobberyService {

  private robberyCollection: AngularFirestoreCollection<Robbery>;
  robbery: Observable<Robbery[]>;
  robberyUsers : Observable<Robbery[]>;

  robberyUser : Robbery;
  robberyDoc: AngularFirestoreDocument<Robbery>;

  constructor(public afs:AngularFirestore, private auth : AuthService) {
    this.robberyCollection = this.afs.collection('robbery');
    this.robbery = this.robberyCollection.valueChanges();
  }

  getRobberys() {
    return this.robbery; 
  }

  getRobberysByUID() {
    this.auth.user.subscribe (user => {
      this.robberyUser.uid = user.uid;
    })
    
    this.robberyCollection = this.afs.collection('robbery', ref => ref.where('uid', '==', this.robberyUser.uid ) )
    this.robberyUsers = this.robberyCollection.valueChanges()
    return this.robberyUser; 
  }

  getRobberysByUsers() {
    this.auth.user.subscribe (user => {
      this.robberyUser.nickName = user.email.split('@')[0];
    })

    this.robberyDoc = this.afs.doc(`robbery/${this.robberyUser.nickName}`);
    return this.robberyUsers; 
  }

  addRobbery(robbery : Robbery) {
    this.robberyCollection.add(robbery);
  }

  deleteRobbery(robbery : Robbery) {
    this.robberyDoc = this.afs.doc(`robbery/${robbery.id}`);
    this.robberyDoc.delete();
  }

  updateRobbery(robbery : Robbery) {
    this.robberyDoc = this.afs.doc(`robbery/${robbery.id}`);
    this.robberyDoc.update(robbery);
  }
}
