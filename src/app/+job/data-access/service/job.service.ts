import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Jobs } from "../model/job.model";
import { ResponseResult, Rows } from "../../../shared/data-access/interface/response.type";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(
        private _http: HttpClient,
    ) { }

    jobsGet(index: number, pageSize: number) {
        return this._http
            .get<ResponseResult<Rows<Jobs.Job>>>(
                'jobs', {
                params: {
                    page: index,
                    take: pageSize
                }
            });
    }
}