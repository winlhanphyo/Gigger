import express, { Express, Request } from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import multer, { FileFilterCallback } from 'multer';
import { v4 } from 'uuid';
import passport from 'passport';
import { config } from './config';
import { router } from './routes';
import authRouter from './routes/auth/auth.router';
import genreRouter from "./routes/genre/genre.router";
import videoStreamRouter from './routes/videoStream/videoStream.router';
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('./config/passport');
const swaggerDocument = YAML.load('./api.yaml');

const fileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    console.log('--------video-----------');
    console.log(_file);
    if (_file?.fieldname == "video") {
      cb(null, "upload/artist/video");
    } else {
      cb(null, "upload/user/profile");
    }
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  }
});

const fileFilter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/mpeg" ||
    file.mimetype === "video/quicktime"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
export default class Server {
  app: Express;
  httpServer: http.Server;

  constructor() {
    this.app = express();

    this.app.use(cors());
    // this.app.use(helmet());
    this.app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use(multer({ storage: fileStorage, fileFilter }).fields([{ name: 'profile', maxCount: 1 }, { name: 'video', maxCount: 1 }]));
    this.app.use("/apiuploads", express.static("apiuploads"));

    this.app.use(passport.initialize());

    this.app.use('/api', authRouter);
    this.app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    this.app.use('/api/interests', genreRouter);
    this.app.use('/api/video', videoStreamRouter);
    this.app.use(passport.authenticate('jwt', { session: false }), router);

    this.app.set('views', __dirname + '/views');
    this.app.set('view engine', 'pug');

    this.app.get('/', (req, res) => {
      res.send('Welcome to My Website')
    });

    // this.app.get('/api/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  
    // this.app.get('/api/auth/google/callback', 
    //   passport.authenticate('google', { failureRedirect: '/error' }),
    //   function(req: any, res: any) {
    //     // res.redirect('/success');
    //     res.send("google signin success");
    //   });

        this.httpServer = http.createServer(this.app);
      }

  start(cb?: () => void) {
    this.httpServer.listen(config.PORT, () => {
      console.log(`Server started at ${config.HOST}:${config.PORT}`);
      if (typeof cb === 'function') {
        cb();
      }
    });
  }
  stop() {
    this.httpServer.close();
  }
}
