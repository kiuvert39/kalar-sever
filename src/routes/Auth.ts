import express from 'express'
import {signUp} from '../controllers/Auth/Auth.register'


import { verifyJwt } from '../middlewwares/jwtVerification'
import { dashIn } from '../controllers/Auth/dashoard'
import { status } from '../controllers/Auth/AuthStatus'
import { logout } from '../controllers/Auth/Auth.logout'
import { loginLimiter } from '../middlewwares/rateLimiter.middleware'
import { logIn } from '../controllers/Auth/Auth.logIn'
export const Authrout = express.Router()

export const register = Authrout.post('/register', signUp)
export const login = Authrout.post('/login',loginLimiter, logIn)
export const logOut = Authrout.get('/logout', logout)

export const Authstatus = Authrout.get('/status', status);
export const dash = Authrout.get('/dash',verifyJwt, dashIn);


