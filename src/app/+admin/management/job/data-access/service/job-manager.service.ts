import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JobApi } from "../model/job-manager.model";
import { ResponseResult, Rows } from "../../../../../shared/data-access/interface/response.type";

@Injectable({
    providedIn: 'root'
})
export class JobManagerService {
    constructor(private _http: HttpClient) {}

    jobsGet(pageIndex: number = 1, pageSize: number = 5) {
        return this._http.get<ResponseResult<Rows<JobApi.Response>>>('jobs', { 
            params: {
                page: pageIndex,
                take: pageSize
            }
        });
    }

    jobsPost(request: JobApi.Request) {
        return this._http.post<ResponseResult<JobApi.Request>>('jobs', request);
    }

    jobsPut(request: JobApi.Request) {
        return this._http.put<ResponseResult<JobApi.Request>>('jobs', request);
    }

    jobsDelete(id: number) {
        return this._http.delete<ResponseResult<JobApi.Request>>('jobs');
    }
}