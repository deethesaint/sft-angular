export namespace Login {
    export type Response = {
        token: string,
        expirationTime: number,
        role: string
    };

    export type Request = {
        username: string,
        password: string
    };
}