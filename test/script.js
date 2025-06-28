import fs from "fs";
import { getListAccounts, session } from "../dist/index.js";

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

    console.log(account);
}

main();
