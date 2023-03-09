"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
const helmet_1 = __importDefault(require("helmet"));
const toobusy_js_1 = __importDefault(require("toobusy-js"));
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app.listen(port, () => {
                    resolve(port);
                }).on('error', (err) => reject(err));
            });
        };
        this.app = (0, express_1.default)();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }
    config() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '1mb' })); // 100mkb default
        this.app.set('view engine', 'ejs');
        this.app.use((0, helmet_1.default)());
        this.app.use(function (req, res, next) {
            if ((0, toobusy_js_1.default)()) {
                res.send('Server too busy!');
            }
            else {
                next();
            }
        });
    }
    dbConnect() {
        //     pool.connect(function (err, client, done) {
        //       if (err) throw new Error('Error');
        //       console.log('Connected');
        //     });
    }
    routerConfig() {
        this.app.use('/auth/google', authRoutes_1.default);
        this.app.use('/contacts', contactRoutes_1.default);
        this.app.use('/', (req, res) => {
            res.send('Welcome to my page!');
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map