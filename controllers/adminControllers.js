"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singinController = exports.signUpController = void 0;
const Database_1 = require("../services/Database");
const utility_1 = require("../utility");
const signUpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const salt = yield (0, utility_1.GenerateSalt)();
    const gPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    const values = [username, email, gPassword, salt];
    Database_1.pool.query("INSERT INTO user (username,email,password,sal) VALUES (?,?,?,?)", values);
    return res.json({ message: "generated user" });
});
exports.signUpController = signUpController;
const singinController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const rows = yield Database_1.pool.query("SELECT * FROM user WHERE username=? AND active=1", [username]);
    const existingUser = JSON.parse(JSON.stringify(rows))[0];
    if (existingUser !== null) {
        //validation and give access
        const validation = yield (0, utility_1.ValidatePassword)(password, existingUser.password, existingUser.sal);
        if (validation) {
            const signature = (0, utility_1.GenerateSignature)({
                _id: existingUser.id,
                email: existingUser.email,
                username: existingUser.name,
            });
            return res.json(signature);
        }
        else {
            return res.json({ "message": "Password  not valid " });
        }
    }
    return res.json({ "message": "login credetials not valid " });
});
exports.singinController = singinController;
