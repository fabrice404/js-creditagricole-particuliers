import { Session } from "./session.js";

export type Account = {
    solde: number;
    meteo: string;
    cartes: any[];
    cartesDD: any[];
    operations: any[];
    operationsInfo: {
        hasNext: boolean;
        listeOperations: any[];
    };
    formulesNBQ: any[];
    libelleDevise: string;
    typeProduit: string;
    valorise: true;
    idElementContrat: string;
    index: number;
    indexList: number;
    codeProduit: string;
    codeFamilleProduit: string;
    idRoleClient: string;
    idPartenaire: string;
    libellePartenaire: string;
    typePartenaire: string;
    idDevise: string;
    libelleProduit: string;
    libelleUsuelProduit: string;
    libelleCompte: string;
    numeroCompte: string;
    codeFamilleContratBam: string;
    numeroCompteBam: string;
    numeroSousCompteBam: string;
    codeFamilleProduitBam: string;
    codeNatureCompteBam: string;
    natureCompteBam: string;
    typeEcranBam: string;
    libellePartenaireBam: string;
    identifiantCompteSupportBam: string;
    compteDepotATerme: false;
    grandeFamilleProduits: string;
    grandeFamilleProduitCode: string;
    familleProduit: {
        code: string;
        grandeFamilleProduits: string;
        libelle: string;
        pertinence: number;
        niveau: number;
    };
    sousFamilleProduit: {
        code: string;
        grandeFamilleProduits: string;
        libelle: string;
        pertinence: number;
        niveau: number;
    };
    rolePartenaireCalcule: "COTITULAIRE";
    numeroCompteSupportCreditBam: "00000000000";
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
