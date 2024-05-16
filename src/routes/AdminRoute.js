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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.AdminRoute = router;
const adminControllers_1 = require("../controllers/adminControllers");
const CommonAuth_1 = require("../middleware/CommonAuth");
router.post("/signUp", adminControllers_1.signUpController);
router.post("/signIn", adminControllers_1.singinController);
router.use(CommonAuth_1.Authenticate);
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "hello from Admin" });
}));
