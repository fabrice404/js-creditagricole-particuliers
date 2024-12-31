import { Account } from "./getListAccounts.js";
import { Session } from "./session.js";
export declare const getOperations: (session: Session, account: Account, dateDebut: string, dateFin: string) => Promise<any>;
