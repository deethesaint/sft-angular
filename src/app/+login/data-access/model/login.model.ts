export namespace Login {
    export type Response = {
        user: {
            username: string,
            role: string,
        }
    };

    export type Request = {
        username: string,
        password: string
    };
}