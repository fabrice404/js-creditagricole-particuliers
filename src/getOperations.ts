import { Account } from "./getListAccounts.js";
import { Session } from "./session.js";

export type Operation = {
    dateOperation: string;
    dateValeur: string;
    typeOperation: string;
    codeTypeOperation: string;
    familleTypeOperation: string;
    libelleOperation: string;
    libelleTypeOperation: string;
    montant: number;
    idDevise: string;
    libelleDevise: string;
    libelleComplementaire: string;
    referenceMandat: string;
    idCreancier: string;
    libelleCash1: string;
    libelleCash2: string;
    idCarte: string;
    indexCarte: number;
    referenceClient: string;
    pictogrammeCSS: string;
    fitid: string;
};

let operations: Operation[] = [];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const resolveStartIndex = (url: string, nextSetStartIndex: string) => {
    const startIndex = url.indexOf("&startIndex=");
    if (startIndex === -1) {
        return `${url}&startIndex=${encodeURI(nextSetStartIndex)}`;
    } else {
        return url.replace(/&startIndex=[^&]+/, `&startIndex=${encodeURI(nextSetStartIndex)}`);
    }
};

const getData = async (resolve: any, reject: any, session: Session, url: string) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "*/*",
            Cookie: session.cookie,
        },
    });
    const operationsJson = await response.json();
    operations = [...operations, ...operationsJson.listeOperations];

    await sleep(1000);

    if (operationsJson.hasNext) {
        getData(resolve, reject, session, resolveStartIndex(url, operationsJson.nextSetStartIndex));
    } else {
        return resolve();
    }
};

export const getOperations = async (
    session: Session,
    account: Account,
    dateDebut: string, // "2024-12-20"
    dateFin: string // "2024-12-26"
): Promise<Operation[]> => {
    const ts_date_debut = new Date(dateDebut).getTime();
    const ts_date_fin = new Date(dateFin).getTime();
    const limit = 90;

    let url = `${session.baseUrl}/${session.regionBankUrl}/particulier/operations/synthese/detail-comptes/`;
    url += "jcr:content.n3.operations.json";
    url += `?grandeFamilleCode=${account.grandeFamilleProduitCode}&compteIdx=${account.index}`;
    url += "&idDevise=EUR";
    url += `&dateDebut=${ts_date_debut}`;
    url += `&dateFin=${ts_date_fin}`;
    url += `&count=${limit}`;

    await new Promise((r, j) => getData(r, j, session, url));

    return operations;
};
