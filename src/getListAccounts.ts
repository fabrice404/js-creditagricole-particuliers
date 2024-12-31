import { Session } from "./session.js";

export type Account = {
    session: Session;
    index: number;
    account: any;
    numeroCompte: string;
    compteIdx: number;
    grandeFamilleProduitCode: number;
};

export async function getListAccounts(session: Session) {
    let accounts: Account[] = [];

    const FAMILLE_PRODUITS = [
        { code: 1, familleProduit: "COMPTES" },
        { code: 3, familleProduit: "EPARGNE_DISPONIBLE" },
        { code: 7, familleProduit: "EPARGNE_AUTRE" },
    ];
    await Promise.all(
        FAMILLE_PRODUITS.map(async (familleProduit) => {
            const url = `${session.baseUrl}/${session.regionBankUrl}/particulier/operations/synthese/jcr:content.produits-valorisation.json/${familleProduit.code}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Cookie: session.cookie,
                },
            });
            const accountsJson = await response.json();
            if (
                !accounts.find((account) => account.numeroCompte === accountsJson["numeroCompte"])
            ) {
                accounts = [...accounts, ...accountsJson];
            }
        })
    );

    return accounts;
}
