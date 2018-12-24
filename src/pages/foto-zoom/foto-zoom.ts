import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotoDTO } from '../../models/foto.dto';
import { FotoService } from '../../app/services/domain/foto.service';
import { API_CONFIG } from '../../config/api.config';

declare var google;

@IonicPage()
@Component({
  selector: 'page-foto-zoom',
  templateUrl: 'foto-zoom.html',
})
export class FotoZoomPage {
  
  bucketUrl: String = API_CONFIG.bucketBaseUrl;
  item: FotoDTO;
  cords: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fotoService: FotoService) {
  }

  ionViewDidLoad() {    
    let id = this.navParams.get('id');
    this.fotoService.findById(id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.fotoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/photo${this.item.id}.jpg`;
      },
      error => {});
  }

}
