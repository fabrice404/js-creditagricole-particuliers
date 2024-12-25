export type Session = {
    cookie: string;
    accountNumber: string;
    baseUrl: string;
    regionBankUrl: string;
    csrfToken: string;
};
export declare class session {
    private baseUrl;
    private cookie;
    regionBankUrl: string;
    static login(accountNumber: string, password: string, region: string): Promise<Session>;
    private resolvePassword;
    getKeypad(): Promise<any>;
    private genCookie;
}
