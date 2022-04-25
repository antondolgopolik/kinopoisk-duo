import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// Routers
import * as IndexController from './route/index_controller.mjs';
import * as RegistrationController from './route/registration_controller.mjs'
import * as LoginController from './route/login_controller.mjs'
import * as UserController from './route/user_controller.mjs';
import * as MovieController from './route/movie_controller.mjs';

export const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', IndexController.router);
app.use('/api/registration', RegistrationController.router);
app.use('/api/login', LoginController.router)
app.use('/api/users', UserController.router);
app.use('/api/movies', MovieController.router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status).send(err.message);
});
