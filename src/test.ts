import { getCurentTransactionXlsx } from "./getCurentTransactionXlsx.js";
import { session } from "./session.js";

async function main() {
    const password = "------";
    const accountNumber = "-------------";
    const region = "--";
    const fileName = "operations.xlsx";
    const newSession = await session.login(accountNumber, password, region);
    getCurentTransactionXlsx(newSession, fileName);
}

main();
