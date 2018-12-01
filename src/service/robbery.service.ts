import { Injectable } from '@angular/core';
import { Robbery } from '../models/robbery';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable()
export class RobberyService {

  private robberyCollection: AngularFirestoreCollection<Robbery>;
  robbery: Observable<Robbery[]>;
  robberyUsers : Observable<Robbery[]>;

  robberyUser : Robbery;
  robberyDoc: AngularFirestoreDocument<Robbery>;
  private user : string;

  constructor(public afs:AngularFirestore, private login : LoginService) {
    this.robberyCollection = this.afs.collection('robbery');
    this.robbery = this.robberyCollection.valueChanges();
  }

  getRobberys() {
    return this.robbery; 
  }

  getRobberysByUID() {
    this.robberyUser.uid = this.login.getUserDetails.uid;
    console.log('User: '+ this.user) ;
    
    this.robberyCollection = this.afs.collection('robbery', ref => ref.where('uid', '==', this.robberyUser.uid ) )
    
    this.robberyUsers = this.robberyCollection.valueChanges()
    console.log(this.robbery)
    return this.robberyUser; 
  }

  getRobberysByUsers() {
    this.robberyUser.nickName = this.login.getUserDetails.email.split('@')[0];
    console.log('User: '+ this.user) ;
    this.robberyDoc = this.afs.doc(`robbery/${this.robberyUser.nickName}`);
    console.log(console.info, this.robberyUser);
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
