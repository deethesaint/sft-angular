export namespace JobApi {
    export interface Response {
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

    export interface Request {
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