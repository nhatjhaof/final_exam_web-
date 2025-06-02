"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = __importDefault(require("routes/web"));
const express = require('express');
const app = express();
const port = 8081;
//config web static
app.use(express.static('public'));
//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//config web routes
(0, web_1.default)(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map