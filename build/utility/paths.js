"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const module_alias_1 = require("module-alias");
(0, module_alias_1.addAliases)({
    '@': `${__dirname}/src`,
    '@controllers': `${__dirname}/controllers`,
    '@models': `${__dirname}/../../rechord-common/models`,
    '@utility': `${__dirname}/utility`,
    '@routes': `${__dirname}/routes`,
});
