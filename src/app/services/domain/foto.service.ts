import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../../config/api.config";
import { FotoDto } from "../../../models/foto.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class FotoService{

    constructor(public http:HttpClient){

    }

    findAll() : Observable<FotoDto[]>{
        return this.http.get<FotoDto[]>(`${API_CONFIG.baseUrl}/fotos/`);
    }
}