export namespace Jobs {
    export type Job = {
        id:            null | string;
        type:          string;
        created_at:    string;
        company:       string;
        company_url:   string;
        location:      string;
        title:         string;  
        description:   string;
        how_to_apply?: string;
        company_logo?: null | string;
        url?:          string;
    }

    export interface GetResponse {
        items: Job[];
        total: number
    }

    export type GetRequest = {
        
    }

    export interface Response {
        newItem: Job
    }

    export type Request = {
        id:            string;
        type:          string;
        created_at:    string;
        company:       string;
        company_url:   string;
        location:      string;
        title:         string;  
        description:   string;
        how_to_apply?: string;
        company_logo?: null | string;
        url?:          string;
    }
}