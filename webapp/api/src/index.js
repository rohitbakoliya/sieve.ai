/* eslint-disable import/first */
import '@babel/polyfill';
import express from 'express';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import path from 'path';
import expressStaticGzip from 'express-static-gzip';
import routes from './routes/index.routes';
import * as errorHandler from './middlewares/errorHandler';
import './config/db';

const PORT = process.env.PORT || 5000;

const app = express();

// express setting
app.set('env', process.env.NODE_ENV);

// TODO: to be fixed in prod
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

// passport middlewares
import './middlewares/passportAuth';
app.use(passport.initialize());

// api routing
app.use('/api', routes);

// to serve gzipped React app
if (app.get('env') === 'production') {
  app.use('/', expressStaticGzip('../client/build', {}));
}

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (_req, res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'), err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}

// Error Handler Middleware
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
