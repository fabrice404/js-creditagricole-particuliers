# Client Javascript pour la banque Crédit agricole - Particuliers

Ce client Javascript est à destination des particuliers souhaitant récupérer ses opérations bancaires stockées par le Crédit Agricole.

> Ce client a été construit suite à l'analyse des requêtes web effectuées par l'application web https://www.credit-agricole.fr/.
> Aucune garantie de fonctionnement à long terme pour ce client.

> Aucun numéro de compte ni mot de passe n'est stocké par ce client !

## Pré-requis

-   Nodejs

## Installation

```BASH
npm i js-creditagricole-particuliers
```

## Utilisation

> Il est fortement conseillé d'inclure les informations de connexion dans des variables d'environnement

### Authentification

Paramètres pour l'authentification:

-   accountNumber (string): votre numéro de compte bancaire
-   password (list of integer): votre mot de passe
-   department (integer): numéro de département de votre caisse régionale

```JAVASCRIPT
import { session } from "js-creditagricole-particuliers";
/*...*/
const password = "582942";
const accountNumber = "12384927252";
const region = "82";

const newSession = await session.login(accountNumber, password, region);

```

### Fichier xlsx

Téléchargement de l'historique du compte au format .xlsx

```JAVASCRIPT
import { getCurentTransactionXlsx } from "js-creditagricole-particuliers";
/*...*/
const fileName = "operations.xlsx";
await getCurentTransactionXlsx(newSession, fileName);
```

### Liste des comptes

Récupération de la liste des comptes de la session

```JAVASCRIPT
import { getListAccounts } from "js-creditagricole-particuliers";
/*...*/
const accounts = await getListAccounts(newSession);
```

### Liste des opérations

Paramètres pour la récupération des opérations:

> Attention limite d'un mois maximun

-   newSession : Session active
-   account : Compte concerné pour la liste des opérations
-   date de début (string)
-   date de fin (string)

```JAVASCRIPT
import { getListAccounts, getOperations } from "js-creditagricole-particuliers";
/*...*/
const account = accounts.find((account) => account.numeroCompte === accountNumber);
    if (!account) {
        throw new Error("Account not found");
    }
const operations = await getOperations(newSession, account, "2024-12-01", "2024-12-26");
```

## Sources

Ce projet est inspiré/converti de la version Python déjà existante.

https://github.com/dmachard/python-creditagricole-particuliers
