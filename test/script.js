const { getCurentTransactionXlsx, session } = require("js-creditagricole-particuliers");

async function main() {
    const password = "------";
    const accountNumber = "-------------";
    const region = "--";
    const fileName = "operations.xlsx";
    const newSession = await session.login(accountNumber, password, region);
    getCurentTransactionXlsx(newSession, fileName);
}

main();
