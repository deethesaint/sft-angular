export namespace Jobs {
    export interface Response {
        items: Job[];
        total: number
    }
    
    export interface Job {
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
}