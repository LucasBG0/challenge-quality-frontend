import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotosPage } from './fotos';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    FotosPage,
  ],
  imports: [
    IonicPageModule.forChild(FotosPage),
  ],
  providers: [
    Camera
  ]
})
export class FotosPageModule {}
