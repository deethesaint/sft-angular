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
        private _http: HttpClient,
    ) {}

    loginPost(request: Login.Request) {
        return this._http
            .post<ResponseResult<Login.Response>>('login', request)
    }

    isLoggedIn() {
        return !!localStorage.getItem("token")
    }

    isAdmin() {
        const role = localStorage.getItem("role");
        return role === 'admin';
    }
}