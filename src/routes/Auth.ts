import express from 'express'
import {signUp} from '../controllers/Auth.register'
import { logIn } from '../controllers/Auth.logIn'

import { verifyJwt } from '../middlewwares/jwtVerification'
import { dashIn } from '../controllers/dashoard'


export const Authrout = express.Router()

export const register = Authrout.post('/register', signUp)
export const login = Authrout.post('/login', logIn)

export const dash = Authrout.get('/dash',verifyJwt, dashIn)


