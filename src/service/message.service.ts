import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class MessageService {


    constructor(public toastCtrl: ToastController) {

    }

    showAlert(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            position: 'bottom',
            showCloseButton : true,
            closeButtonText : "Ok"
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
        toast.present(toast);
    }
}