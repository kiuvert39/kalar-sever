import express from 'express'
import {signUp} from '../controllers/Auth.register'
import { logIn } from '../controllers/Auth.logIn'

import { verifyJwt } from '../middlewwares/jwtVerification'
import { dashIn } from '../controllers/dashoard'
import { status } from '../controllers/AuthStatus'
import { logout } from '../controllers/Auth.logout'
import { loginLimiter } from '../middlewwares/rateLimiter.middleware'
export const Authrout = express.Router()

export const register = Authrout.post('/register', signUp)
export const login = Authrout.post('/login',loginLimiter, logIn)
export const logOut = Authrout.get('/logout', logout)

export const Authstatus = Authrout.get('/status', status);
export const dash = Authrout.get('/dash',verifyJwt, dashIn);


