import { Router } from "express";
import { create, get, modify, deleteTask } from "./task.controller.js";
import { validateJwt } from "../middlewares/validate-jwt.js";

const api = Router();

//=========================//
//      Rutas Privadas    //
//=======================//

api.post('/create', [validateJwt], create);
api.get('/', [validateJwt], get);
api.put('/modify/:id', [validateJwt], modify);
api.delete('/delete/:id', [validateJwt], deleteTask);

export default api;