'use strict'

import { hash, compare } from 'bcrypt';

/*====================== */
/*       ENCRYPT         */
/*====================== */

//encriptar cualquier cosa
export const encrypt = (value) => {
    try {
        return hash(value, 10);
    } catch (err) {
        console.error(err);
        return err;
    }
}

/*====================== */
/*      VALIDATE         */
/*====================== */

//Validar encriptaciones

export const checkEncrypt = async (value, valueEncrypt) => {
    try {
        return await compare(value, valueEncrypt);
    } catch (err) {
        console.error(err);
        return err;
    }
}

//validar actualizacion
export const checkUpdate = (data) => {

    if (
        Object.entries(data).length === 0 ||
        data.password || //si cambia la password devuelve false
        data.password == '' //si envia la password vacia
    ) return false;
    return true;

}