var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var REGIONS = [
    { id: "05", code: "ca-alpesprovence" },
    { id: "84", code: "ca-alpesprovence" },
    { id: "13", code: "ca-alpesprovence" },
    { id: "67", code: "ca-alsace-vosges" },
    { id: "68", code: "ca-alsace-vosges" },
    { id: "88", code: "ca-alsace-vosges" },
    { id: "49", code: "ca-anjou-maine" },
    { id: "72", code: "ca-anjou-maine" },
    { id: "40", code: "ca-aquitaine" },
    { id: "47", code: "ca-aquitaine" },
    { id: "44", code: "ca-atlantique-vendee" },
    { id: "85", code: "ca-atlantique-vendee" },
    { id: "80", code: "ca-briepicardie" },
    { id: "01", code: "ca-centrest" },
    { id: "71", code: "ca-centrest" },
    { id: "03", code: "ca-centrefrance" },
    { id: "23", code: "ca-centrefrance" },
    { id: "15", code: "ca-centrefrance" },
    { id: "63", code: "ca-centrefrance" },
    { id: "18", code: "ca-centreloire" },
    { id: "58", code: "ca-centreloire" },
    { id: "36", code: "ca-centreouest" },
    { id: "87", code: "ca-centreouest" },
    { id: "10", code: "ca-cb" },
    { id: "21", code: "ca-cb" },
    { id: "52", code: "ca-cb" },
    { id: "79", code: "ca-cmds" },
    { id: "16", code: "ca-charente-perigord" },
    { id: "24", code: "ca-charente-perigord" },
    { id: "22", code: "ca-cotesdarmor" },
    { id: "74", code: "ca-des-savoie" },
    { id: "29", code: "ca-finistere" },
    { id: "25", code: "ca-franchecomte" },
    { id: "70", code: "ca-franchecomte" },
    { id: "39", code: "ca-franchecomte" },
    { id: "90", code: "ca-franchecomte" },
    { id: "35", code: "ca-illeetvilaine" },
    { id: "30", code: "ca-languedoc" },
    { id: "48", code: "ca-languedoc" },
    { id: "34", code: "ca-languedoc" },
    { id: "42", code: "ca-loirehauteloire" },
    { id: "43", code: "ca-loirehauteloire" },
    { id: "54", code: "ca-lorraine" },
    { id: "55", code: "ca-lorraine" },
    { id: "57", code: "ca-lorraine" },
    { id: "56", code: "ca-morbihan" },
    { id: "59", code: "ca-norddefrance" },
    { id: "62", code: "ca-norddefrance" },
    { id: "02", code: "ca-nord-est" },
    { id: "51", code: "ca-nord-est" },
    { id: "08", code: "ca-nord-est" },
    { id: "12", code: "ca-nmp" },
    { id: "81", code: "ca-nmp" },
    { id: "82", code: "ca-nmp" },
    { id: "14", code: "ca-normandie" },
    { id: "50", code: "ca-normandie" },
    { id: "76", code: "ca-normandie-seine" },
    { id: "75", code: "ca-paris" },
    { id: "78", code: "ca-paris" },
    { id: "92", code: "ca-paris" },
    { id: "93", code: "ca-paris" },
    { id: "94", code: "ca-paris" },
    { id: "95", code: "ca-paris" },
    { id: "04", code: "ca-pca" },
    { id: "83", code: "ca-pca" },
    { id: "06", code: "ca-pca" },
    { id: "64", code: "ca-pyrenees-gascogne" },
    { id: "09", code: "ca-sudmed" },
    { id: "66", code: "ca-sudmed" },
    { id: "31", code: "ca-toulouse31" },
    { id: "86", code: "ca-tourainepoitou" },
    { id: "28", code: "ca-valdefrance" },
    { id: "974", code: "ca-reunion" },
    { id: "976", code: "ca-reunion" },
    { id: "972", code: "ca-martinique" },
    { id: "973", code: "ca-martinique" },
    { id: "971", code: "ca-guadeloupe" },
    { id: "2A", code: "ca-corse" },
    { id: "2B", code: "ca-corse" },
];
var session = /** @class */ (function () {
    function session() {
        this.baseUrl = "https://www.credit-agricole.fr";
        this.cookie = [];
        this.regionBankUrl = "ca-undefined";
        this.resolvePassword = function (keyLayout, password) {
            var passwordEncodedCache = [];
            for (var i = 0; i < password.length; i++) {
                var char = password[i];
                var index = keyLayout.indexOf(char);
                passwordEncodedCache.push(index);
            }
            return passwordEncodedCache.toString();
        };
    }
    session.login = function (accountNumber, password, region) {
        return __awaiter(this, void 0, void 0, function () {
            var instSession, found, keypad, passwordResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instSession = new session();
                        if (region.startsWith("ca-")) {
                            instSession.regionBankUrl = region;
                        }
                        else {
                            found = REGIONS.find(function (r) { return r.id === region; });
                            if (!found) {
                                throw new Error("[error] region cannot be found: ".concat(region));
                            }
                            instSession.regionBankUrl = found.code;
                        }
                        return [4 /*yield*/, instSession.getKeypad()];
                    case 1:
                        keypad = _a.sent();
                        passwordResolved = instSession.resolvePassword(keypad.keyLayout, password);
                        return [4 /*yield*/, instSession.genCookie({
                                responseKeyPad: keypad,
                                password: passwordResolved,
                                accountNumber: accountNumber,
                                cookie: instSession.cookie,
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                cookie: instSession.cookie.join("; "),
                                csrfToken: instSession.cookie[2],
                                baseUrl: instSession.baseUrl,
                                accountNumber: accountNumber,
                                regionBankUrl: instSession.regionBankUrl,
                            }];
                }
            });
        });
    };
    session.prototype.getKeypad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.baseUrl, "/").concat(this.regionBankUrl, "/particulier/acceder-a-mes-comptes.authenticationKeypad.json"), {
                            method: "POST",
                            credentials: "include",
                        }).then(function (response) {
                            var _a;
                            (_a = _this.cookie).push.apply(_a, response.headers.getSetCookie());
                            return response.json();
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    session.prototype.genCookie = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var loginUrl, headers, payload, response, regionalBanks, _c, _d, _e, error_1;
            var _f;
            var responseKeyPad = _b.responseKeyPad, password = _b.password, accountNumber = _b.accountNumber, cookie = _b.cookie;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        loginUrl = "".concat(this.baseUrl, "/").concat(this.regionBankUrl, "/particulier/acceder-a-mes-comptes.html/j_security_check");
                        headers = {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                            Cookie: cookie.join("; "),
                        };
                        payload = {
                            path: "/content/npc/start",
                            j_password: password,
                            j_path_resource: "".concat(this.baseUrl, "/").concat(this.regionBankUrl, "/particulier/operations/synthese.html"),
                            j_username: accountNumber,
                            j_validate: "true",
                            keypadId: responseKeyPad.keypadId,
                        };
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, fetch(loginUrl, {
                                method: "POST",
                                headers: headers,
                                body: new URLSearchParams(payload).toString(),
                            })];
                    case 2:
                        response = _g.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        regionalBanks = _g.sent();
                        if (!!response.ok) return [3 /*break*/, 5];
                        _c = Error.bind;
                        _e = (_d = "[error] get regional bank by departement: ".concat(response.status, " - ")).concat;
                        return [4 /*yield*/, response.text()];
                    case 4: throw new (_c.apply(Error, [void 0, _e.apply(_d, [_g.sent()])]))();
                    case 5:
                        (_f = this.cookie).push.apply(_f, response.headers.getSetCookie());
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _g.sent();
                        throw error_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return session;
}());
export { session };
