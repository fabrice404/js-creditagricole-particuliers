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
import { readFileSync } from "fs";
var aliases = JSON.parse(readFileSync("./aliases.json", "utf-8"));
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
            var instSession, keypad, passwordResolved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instSession = new session();
                        instSession.regionBankUrl = aliases[region].alias;
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
