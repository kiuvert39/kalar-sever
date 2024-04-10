import express from 'express'
import {signUp} from '../controllers/Auth.register'
import { logIn } from '../controllers/Auth.logIn'

import { verifyJwt } from '../middlewwares/jwtVerification'
import { dashIn } from '../controllers/dashoard'
import { status } from '../controllers/AuthStatus'


export const Authrout = express.Router()

export const register = Authrout.post('/register', signUp)
export const login = Authrout.post('/login', logIn)

export const Authstatus = Authrout.get('/status', status);
export const dash = Authrout.get('/dash',verifyJwt, dashIn)


