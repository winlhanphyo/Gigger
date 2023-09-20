"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const passport_1 = __importDefault(require("passport"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const auth_router_1 = __importDefault(require("./routes/auth/auth.router"));
const genre_router_1 = __importDefault(require("./routes/genre/genre.router"));
const videoStream_router_1 = __importDefault(require("./routes/videoStream/videoStream.router"));
const constant_1 = require("./utils/constant");
const user_1 = require("./services/user");
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('./config/passport');
const swaggerDocument = YAML.load('./api.yaml');
const fileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        if ((_file === null || _file === void 0 ? void 0 : _file.fieldname) == "video") {
            cb(null, constant_1.USER_VIDEO_PATH);
        }
        else {
            cb(null, constant_1.USER_PROFILE_PATH);
        }
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}_${file.originalname}`);
    }
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "video/mp4" ||
        file.mimetype === "video/mpeg" ||
        file.mimetype === "video/quicktime") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        // this.app.use(helmet());
        this.app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).fields([{ name: 'profile', maxCount: 1 }, { name: 'video', maxCount: 1 }]));
        this.app.use("/api", express_1.default.static("apiuploads"));
        this.app.use(passport_1.default.initialize());
        this.app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
        // this.app.use(session({
        //   secret: 'secrect', // Replace this with a secure secret key
        //   resave: false,
        //   saveUninitialized: false
        // }));
        this.app.use(passport_1.default.session());
        this.app.get('/verify-email/:id/:token', (req, res) => {
            return user_1.userService.verifyAccount(req, res);
        });
        this.app.use('/api', auth_router_1.default);
        this.app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
        this.app.use('/api/interests', genre_router_1.default);
        this.app.use('/api/video', videoStream_router_1.default);
        this.app.use(passport_1.default.authenticate('jwt', { session: true }), routes_1.router);
        this.app.set('views', __dirname + '/views');
        this.app.set('view engine', 'pug');
        this.app.get('/', (req, res) => {
            res.send('Welcome to My Website');
        });
        // this.app.get('/api/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
        // this.app.get('/api/auth/google/callback', 
        //   passport.authenticate('google', { failureRedirect: '/error' }),
        //   function(req: any, res: any) {
        //     // res.redirect('/success');
        //     res.send("google signin success");
        //   });
        this.httpServer = http_1.default.createServer(this.app);
    }
    start(cb) {
        this.httpServer.listen(config_1.config.PORT, () => {
            console.log(`Server started at ${config_1.config.HOST}:${config_1.config.PORT}`);
            if (typeof cb === 'function') {
                cb();
            }
        });
    }
    stop() {
        this.httpServer.close();
    }
}
exports.default = Server;
