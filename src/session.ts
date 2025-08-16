export type Session = {
    cookie: string;
    accountNumber: string;
    baseUrl: string;
    regionBankUrl: string;
    csrfToken: string;
};

const REGIONS = [
    { id: "05", code: "ca-alpesprovence" },
    { id: "84", code: "ca-alpesprovence" },
    { id: "13", code: "ca-alpesprovence" },
    { id: "67", code: "ca-alsace-vosges" },
    { id: "68", code: "ca-alsace-vosges" },
    { id: "88", code: "ca-alsace-vosges" },
    { id: "49", code: "ca-anjou-maine" },
    { id: "72", code: "ca-anjou-maine" },
    { id: "40", code: "ca-aquitaine" },
    { id: "47", code: "ca-aquitaine" },
    { id: "44", code: "ca-atlantique-vendee" },
    { id: "85", code: "ca-atlantique-vendee" },
    { id: "80", code: "ca-briepicardie" },
    { id: "01", code: "ca-centrest" },
    { id: "71", code: "ca-centrest" },
    { id: "03", code: "ca-centrefrance" },
    { id: "23", code: "ca-centrefrance" },
    { id: "15", code: "ca-centrefrance" },
    { id: "63", code: "ca-centrefrance" },
    { id: "18", code: "ca-centreloire" },
    { id: "58", code: "ca-centreloire" },
    { id: "36", code: "ca-centreouest" },
    { id: "87", code: "ca-centreouest" },
    { id: "10", code: "ca-cb" },
    { id: "21", code: "ca-cb" },
    { id: "52", code: "ca-cb" },
    { id: "79", code: "ca-cmds" },
    { id: "16", code: "ca-charente-perigord" },
    { id: "24", code: "ca-charente-perigord" },
    { id: "22", code: "ca-cotesdarmor" },
    { id: "74", code: "ca-des-savoie" },
    { id: "29", code: "ca-finistere" },
    { id: "25", code: "ca-franchecomte" },
    { id: "70", code: "ca-franchecomte" },
    { id: "39", code: "ca-franchecomte" },
    { id: "90", code: "ca-franchecomte" },
    { id: "35", code: "ca-illeetvilaine" },
    { id: "30", code: "ca-languedoc" },
    { id: "48", code: "ca-languedoc" },
    { id: "34", code: "ca-languedoc" },
    { id: "42", code: "ca-loirehauteloire" },
    { id: "43", code: "ca-loirehauteloire" },
    { id: "54", code: "ca-lorraine" },
    { id: "55", code: "ca-lorraine" },
    { id: "57", code: "ca-lorraine" },
    { id: "56", code: "ca-morbihan" },
    { id: "59", code: "ca-norddefrance" },
    { id: "62", code: "ca-norddefrance" },
    { id: "02", code: "ca-nord-est" },
    { id: "51", code: "ca-nord-est" },
    { id: "08", code: "ca-nord-est" },
    { id: "12", code: "ca-nmp" },
    { id: "81", code: "ca-nmp" },
    { id: "82", code: "ca-nmp" },
    { id: "14", code: "ca-normandie" },
    { id: "50", code: "ca-normandie" },
    { id: "76", code: "ca-normandie-seine" },
    { id: "75", code: "ca-paris" },
    { id: "78", code: "ca-paris" },
    { id: "92", code: "ca-paris" },
    { id: "93", code: "ca-paris" },
    { id: "94", code: "ca-paris" },
    { id: "95", code: "ca-paris" },
    { id: "04", code: "ca-pca" },
    { id: "83", code: "ca-pca" },
    { id: "06", code: "ca-pca" },
    { id: "64", code: "ca-pyrenees-gascogne" },
    { id: "09", code: "ca-sudmed" },
    { id: "66", code: "ca-sudmed" },
    { id: "31", code: "ca-toulouse31" },
    { id: "86", code: "ca-tourainepoitou" },
    { id: "28", code: "ca-valdefrance" },
    { id: "974", code: "ca-reunion" },
    { id: "976", code: "ca-reunion" },
    { id: "972", code: "ca-martinique" },
    { id: "973", code: "ca-martinique" },
    { id: "971", code: "ca-guadeloupe" },
    { id: "2A", code: "ca-corse" },
    { id: "2B", code: "ca-corse" },
];

export class session {
    private baseUrl: string = "https://www.credit-agricole.fr";
    private cookie: string[] = [];
    public regionBankUrl: string = "ca-undefined";

    static async login(accountNumber: string, password: string, region: string): Promise<Session> {
        const instSession = new session();
        if (region.startsWith("ca-")) {
            instSession.regionBankUrl = region;
        } else {
            const found = REGIONS.find((r) => r.id === region);
            if (!found) {
                throw new Error(`[error] region cannot be found: ${region}`);
            }
            instSession.regionBankUrl = found.code;
        }
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
                    `[error] get regional bank by departement: ${response.status
                    } - ${await response.text()}`
                );
            }

            this.cookie.push(...response.headers.getSetCookie());
        } catch (error) {
            throw error;
        }
    }
}
