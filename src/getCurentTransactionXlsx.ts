import { createWriteStream } from "fs";
import { Readable } from "stream";
import { Session } from "./session.js";

export async function getCurentTransactionXlsx(session: Session, fileName?: string) {
    const url = `${session.baseUrl}/${session.regionBankUrl}/particulier/operations/operations-courantes/telechargement/jcr:content.getFichier.json`;

    const responseXlsx = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "csrf-token": session.csrfToken,
            Cookie: session.cookie,
        },
        body: JSON.stringify({
            comptes: [session.accountNumber],
            format: "xlsx",
            debut: "01/12/2023",
            fin: "24/12/2024",
            type: "m",
            dateDebutList: { [session.accountNumber]: "01/12/2023" },
        }),
    });
    if (responseXlsx.ok && responseXlsx.body) {
        let writer = createWriteStream(fileName ?? "operations.xlsx");
        Readable.fromWeb(responseXlsx.body as any).pipe(writer);
    }
}
