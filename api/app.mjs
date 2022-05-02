import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// Фильтры
import * as AuthTokenFilter from './filter/auth_token_filter.mjs';

// Контроллеры API
import * as RegistrationController from './route/registration_controller.mjs'
import * as LoginController from './route/login_controller.mjs';
import * as LogoutController from './route/logout_controller.mjs';
import * as UserController from './route/user_controller.mjs';
import * as UserProfileController from './route/user_profile_controller.mjs';
import * as MovieController from './route/movie_controller.mjs';
import * as WatchTogetherRequestController from './route/watch_together_request_controller.mjs';

export const app = express();

app.disable('etag');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Фильтр
app.use(AuthTokenFilter.extractAuthToken);

// API
app.use('/api/registration', RegistrationController.router);
app.use('/api/login', LoginController.router);
app.use('/api/logout', LogoutController.router)
app.use('/api/users', UserController.router);
app.use('/api/movies', MovieController.router);
app.use('/api/profile', UserProfileController.router);
app.use('/api/watch-together-requests', WatchTogetherRequestController.router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status).send(err.message);
});
