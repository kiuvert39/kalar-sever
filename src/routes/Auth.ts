import express from 'express'
import {signUp,logIn} from '../controllers/Auth.controller'


export const Authrout = express.Router()


Authrout.post('/', signUp)
Authrout.get('/', logIn)


