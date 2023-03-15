import express, { Application, Router, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser';
import pool from './dbconfig/dbconnector';
import authRouter from './routes/authRoutes';
import contactsRouter from './routes/contactRoutes';
import helmet from 'helmet';
import toobusy from 'toobusy-js';

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '1mb' })); // 100mkb default
    this.app.use(helmet());
    this.app.use(function(req, res, next) {
      if(toobusy()) {
        res.send('Server too busy!');
      } else {
        next();
      }
    });
    this.app.set('view engine', 'ejs');
  }

  private dbConnect() {
//     pool.connect(function (err, client, done) {
//       if (err) throw new Error('Error');
//       console.log('Connected');
//     });
  }

  private routerConfig() {
     this.app.use('/auth/google', authRouter);
     this.app.use('/contacts', contactsRouter);
     this.app.use('/', (req: Request, res: Response) => {
       res.send('Welcome to my page with nodemon!');
     });
  }

  public start = ( port : number ) => {
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
      }).on('error', (err : Object) => reject(err));
    });
  }
}

export default Server;
