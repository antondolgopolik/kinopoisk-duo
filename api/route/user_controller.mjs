import express from 'express';
import * as UserFacade from '../facade/user_facade.mjs';
import * as UserTokenService from '../service/user_token_service.mjs';

export const router = express.Router();
