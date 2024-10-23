import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Login } from "../model/login.model";
import { ResponseResult } from "../../../shared/data-access/interface/response.type";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private _http: HttpClient
    ) { }

    loginPost(request: Login.Request) {
        return this._http
            .post<ResponseResult<Login.Response>>('login', request)
            .pipe(
                map((response) => {
                    console.log(response);
                    return response;
                }));
    }
}