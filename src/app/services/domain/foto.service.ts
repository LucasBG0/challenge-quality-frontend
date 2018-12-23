import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../../config/api.config";
import { FotoDTO } from "../../../models/foto.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class FotoService{

    constructor(public http:HttpClient){

    }

    findAll() : Observable<FotoDTO[]>{
        return this.http.get<FotoDTO[]>(`${API_CONFIG.baseUrl}/fotos/`);
    }
}