import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotoZoomPage } from './foto-zoom';

@NgModule({
  declarations: [
    FotoZoomPage,
  ],
  imports: [
    IonicPageModule.forChild(FotoZoomPage),
  ],
})
export class FotoZoomPageModule {}
