import { Router } from "express";
import { login, register, test, updateProfile, modifyPassword, deleteUser} from "./user.controller.js";
import { validateJwt} from './../middlewares/validate-jwt.js';

const api = Router();

//=========================//
//      Rutas Publicas    //
//=======================//

//test
api.get('/test', test);

//login
api.post('/', login);

//crear cuenta
api.post('/register', register)

//=========================//
//      Rutas Privadas    //
//=======================//

api.put('/modify', [validateJwt], updateProfile);

api.put('/password', [validateJwt], modifyPassword);

api.put('/delete', [validateJwt], deleteUser);


export default api;