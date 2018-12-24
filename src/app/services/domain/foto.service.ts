import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../../config/api.config";
import { FotoDTO } from "../../../models/foto.dto";
import { Observable } from "rxjs/Rx";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class FotoService{

    constructor(public http:HttpClient, public imageUtilService: ImageUtilService){

    }

    findAll() : Observable<FotoDTO[]>{
        return this.http.get<FotoDTO[]>(`${API_CONFIG.baseUrl}/fotos/`);
    }

    findById(id : string) {
        return this.http.get<FotoDTO>(`${API_CONFIG.baseUrl}/fotos/${id}`);
    }

    delete(id : string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/fotos/${id}`);
    }

    getSmallImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/photo${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});
      }  
    
    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/photo${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    } 

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/fotos/upload`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    insert(obj: FotoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/fotos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}