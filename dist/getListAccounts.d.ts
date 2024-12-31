import { Session } from "./session.js";
export type Account = {
    session: Session;
    index: number;
    account: any;
    numeroCompte: string;
    compteIdx: number;
    grandeFamilleProduitCode: number;
};
export declare function getListAccounts(session: Session): Promise<Account[]>;
