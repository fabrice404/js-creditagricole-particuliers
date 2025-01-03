import fs from "fs";
import { getListAccounts, getOperations, session } from "js-creditagricole-particuliers";

const readEnvJson = () => {
    const data = fs.readFileSync("./test/env.json", "utf8");
    return JSON.parse(data);
};

async function main() {
    const env = readEnvJson();
    const password = env.password;
    const accountNumber = env.accountNumber;
    const region = env.region;
    const newSession = await session.login(accountNumber, password, region);
    const accounts = await getListAccounts(newSession);
    const account = accounts.find((account) => account.numeroCompte === accountNumber);
    if (!account) {
        throw new Error("Account not found");
    }
    const now = new Date();
    const operations = await getOperations(
        newSession,
        account,
        "2024-01-01 06:03:56.00001",
        now.toDateString()
    );
    console.log(operations.length);
    if (operations.length) {
        console.log(operations[0].dateOperation);
        console.log(operations[operations.length - 1].dateOperation);
    }
}

main();
