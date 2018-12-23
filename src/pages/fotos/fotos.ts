import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotoService } from '../../app/services/domain/foto.service';

/**
 * Generated class for the FotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fotos',
  templateUrl: 'fotos.html',
})
export class FotosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fotoService: FotoService) {
  }

  ionViewDidLoad() {
    this.fotoService.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }
}
