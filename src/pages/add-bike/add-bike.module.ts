import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBikePage } from './add-bike';

@NgModule({
  declarations: [
    AddBikePage,
  ],
  imports: [
    IonicPageModule.forChild(AddBikePage),
  ],
})
export class AddBikePageModule {}