import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertWindowPage } from './alert-window';

@NgModule({
  declarations: [
    AlertWindowPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertWindowPage),
  ],
})
export class AlertWindowPageModule {}
