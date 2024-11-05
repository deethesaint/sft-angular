import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Jobs } from "../model/job-manager.model";
import { ResponseResult, Rows } from "../../../../../shared/data-access/interface/response.type";

@Injectable({
    providedIn: 'root'
})
export class JobManagerService {
    constructor(private _http: HttpClient) {}

    jobsGet(pageIndex: number = 1, pageSize: number = 5) {
        return this._http.get<ResponseResult<Rows<Jobs.Job>>>('jobs', { 
            params: {
                page: pageIndex,
                take: pageSize
            }
        });
    }

    jobsPost(request: Jobs.Request) {
        return this._http.post<ResponseResult<Jobs.Response>>('jobs', request);
    }

    jobsPut(request: Jobs.Request) {
        return this._http.put<ResponseResult<Jobs.Response>>('jobs', request);
    }

    jobsDelete(request: Jobs.Request) {
        return this._http.delete<ResponseResult<Jobs.Response>>('jobs', {
            body: request
        });
    }
}