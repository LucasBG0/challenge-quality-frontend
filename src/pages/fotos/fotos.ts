import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotoService } from '../../app/services/domain/foto.service';
import { FotoDTO } from '../../models/foto.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-fotos',
  templateUrl: 'fotos.html',
})
export class FotosPage {

  bucketUrl: String = API_CONFIG.bucketBaseUrl;
  items: FotoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fotoService: FotoService) {
  }

  ionViewDidLoad() {
    this.fotoService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }
}
