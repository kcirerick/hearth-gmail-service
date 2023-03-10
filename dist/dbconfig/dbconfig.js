"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 3,
    connectionString: 'postgres://user:password@hostname:port/dbname',
    idleTimeoutMillis: 30000
});
//# sourceMappingURL=dbconfig.js.map