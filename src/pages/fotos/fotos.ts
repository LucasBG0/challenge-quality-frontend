import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotoService } from '../../app/services/domain/foto.service';
import { FotoDTO } from '../../models/foto.dto';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-fotos',
  templateUrl: 'fotos.html',
})
export class FotosPage {

  bucketUrl: String = API_CONFIG.bucketBaseUrl;
  items: FotoDTO[];
  picture: string;
  cameraOn: boolean = false;
  fotoClass: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fotoService: FotoService, public camera: Camera, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.fotoService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }

  deleteImage(id){
    this.fotoService.delete(id);
    console.log('deletando a imagem '+id);
  }

  zoomImage(id: string){
    this.navCtrl.push('FotoZoomPage', {id: id});
    console.log('zoom na imagem ' + id);
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
     this.cameraOn = false;
    });
  }

  getGalleryPicture() {

    //CRIAR CLASSE DA FOTO
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    this.fotoService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        //this.loadData();
        this.newFoto();
      },
      error => {
      });
  }

  cancel() {
    this.picture = null;
  }

  newFoto(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('latitude:' + resp.coords.latitude);
      // resp.coords.latitude
      console.log('longitude:' + resp.coords.longitude);
      // resp.coords.longitude
      const obj={
        "latitude": resp.coords.latitude.toString(),
        "longitude": resp.coords.longitude.toString()
      };
      this.fotoService.insert(obj)
      .subscribe(response => {
        console.log(response.headers.get('location'));
      },
      error =>{
  
      }
     )            
     }).catch((error) => {
       console.log('Error getting location', error);
     });    
  }
}
