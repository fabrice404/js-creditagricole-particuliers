import { Account } from "./getListAccounts.js";
import { Session } from "./session.js";

export const getOperations = async (
    session: Session,
    account: Account,
    dateDebut: string, // "2024-12-20"
    dateFin: string // "2024-12-26"
) => {
    const ts_date_debut = new Date(dateDebut).getTime();
    const ts_date_fin = new Date(dateFin).getTime();
    const limit = 100;

    let url = `${session.baseUrl}/${session.regionBankUrl}/particulier/operations/synthese/detail-comptes/`;
    url += "jcr:content.n3.operations.json";
    url += `?grandeFamilleCode=${account.grandeFamilleProduitCode}&compteIdx=${account.index}`;
    url += "&idDevise=EUR";
    url += `&dateDebut=${ts_date_debut}`;
    url += `&dateFin=${ts_date_fin}`;
    url += `&limit=${limit}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "*/*",
            Cookie: session.cookie,
        },
    });
    const accountsJson = await response.json();
    return accountsJson;
};
