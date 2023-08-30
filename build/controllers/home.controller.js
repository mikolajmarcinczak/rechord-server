"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    static welcome(req, res) {
        return res.json({ message: "Welcome to reChord!" });
    }
}
exports.default = HomeController;
