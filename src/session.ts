import { readFileSync } from "fs";

const aliases = JSON.parse(readFileSync("./aliases.json", "utf-8"));

export type Session = {
    cookie: string;
    accountNumber: string;
    baseUrl: string;
    regionBankUrl: string;
    csrfToken: string;
};

export class session {
    private baseUrl: string = "https://www.credit-agricole.fr";
    private cookie: string[] = [];
    public regionBankUrl: string = "ca-undefined";

    static async login(accountNumber: string, password: string, region: string): Promise<Session> {
        const instSession = new session();
        instSession.regionBankUrl = aliases[region].alias;
        const keypad = await instSession.getKeypad();
        const passwordResolved = instSession.resolvePassword(keypad.keyLayout, password);
        await instSession.genCookie({
            responseKeyPad: keypad,
            password: passwordResolved,
            accountNumber: accountNumber,
            cookie: instSession.cookie,
        });
        return {
            cookie: instSession.cookie.join("; "),
            csrfToken: instSession.cookie[2],
            baseUrl: instSession.baseUrl,
            accountNumber,
            regionBankUrl: instSession.regionBankUrl,
        };
    }

    private resolvePassword = (keyLayout: string[], password: string): string => {
        let passwordEncodedCache = [];
        for (let i = 0; i < password.length; i++) {
            const char = password[i];
            const index = keyLayout.indexOf(char);
            passwordEncodedCache.push(index);
        }
        return passwordEncodedCache.toString();
    };

    public async getKeypad() {
        return await fetch(
            `${this.baseUrl}/${this.regionBankUrl}/particulier/acceder-a-mes-comptes.authenticationKeypad.json`,
            {
                method: "POST",
                credentials: "include",
            }
        ).then((response) => {
            this.cookie.push(...response.headers.getSetCookie());
            return response.json();
        });
    }

    private async genCookie({
        responseKeyPad,
        password,
        accountNumber,
        cookie,
    }: {
        responseKeyPad: any;
        password: string;
        accountNumber: string;
        cookie: string[];
    }) {
        const loginUrl = `${this.baseUrl}/${this.regionBankUrl}/particulier/acceder-a-mes-comptes.html/j_security_check`;
        let headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Cookie: cookie.join("; "),
        };
        let payload = {
            path: "/content/npc/start",
            j_password: password,
            j_path_resource: `${this.baseUrl}/${this.regionBankUrl}/particulier/operations/synthese.html`,
            j_username: accountNumber,
            j_validate: "true",
            keypadId: responseKeyPad.keypadId,
        };

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: headers,
                body: new URLSearchParams(payload).toString(),
            });
            const regionalBanks = await response.json();

            if (!response.ok) {
                throw new Error(
                    `[error] get regional bank by departement: ${
                        response.status
                    } - ${await response.text()}`
                );
            }

            this.cookie.push(...response.headers.getSetCookie());
        } catch (error) {
            throw error;
        }
    }
}
