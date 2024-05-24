'use strict'

import User from './user.model.js';
import { checkEncrypt, encrypt, checkUpdate } from './../../utils/validator.js';
import { generateJwt } from './../../utils/jwt.js';

//Funcion para realizar test
export const test = (req, res) => {
    console.log('user test is running...');
    return res.send({ message: `User test is running...` })
}

//Funcion para registrar usuarios
export const register = async (req, res) => {
    try {
        let data = req.body;

        //validar que no haya un user existente
        let findUser = await User.findOne({ username: data.username });
        if (findUser) return res.status(409).send({ message: `Username already exists.` });
        //validar que el correo no este en uso
        let findEmail = await User.findOne({ email: data.email });
        if (findEmail) return res.status(409).send({ message: `Email already in use.` })

        //encriptar la contrasenia
        data.password = await encrypt(data.password);

        //creamos nuestro usuario
        let user = new User(data);
        //guardamos en mongo
        await user.save();
        //respondemos al usuario
        return res.send({ message: `Registered successfully.` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error registering user. | `, err: err.errors })
    }
}


//Funcion para logearse con usuario o correo
export const login = async (req, res) => {
    try {
        let { username, password } = req.body;
        let user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) return res.status(404).send({ message: `Invalid credentials.` })

        //validamos que el usuario este activo
        if (user.status == false) return res.status(403).send({ message: `You don't have access | Please contact technical support.` });

        if (await checkEncrypt(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
            }

            //generar el token y enviarlo como respuesta.
            let token = await generateJwt(loggedUser);
            return res.send({
                message: `WELCOME ${user.username}`,
                loggedUser,
                token
            })
        }
        //si no coincide la contrasenia
        return res.status(400).send({ message: `Invalid credentials` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error trying login` });
    }
}

//modificar perfil personal - user
export const updateProfile = async (req, res) => {
    try {
        let data = req.body;
        let { _id } = req.user;

        if (!data || Object.entries(data).length == 0) return res.status(400).send({ message: `Data empty` });
        if (!checkUpdate(data)) return res.status(400).send({ message: `can't modify` });

        let user = await User.findOneAndUpdate(
            { _id },
            data,
            { new: true }
        );
        return res.send({ message: `Profile modify`, user });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error to modify profile`, err })
    }
}

//modificar contraseña - cuenta personal
export const modifyPassword = async (req, res) => {
    try {
        let { oldPassword, newPassword } = req.body;
        let { _id, password } = req.user;


        if (!oldPassword || newPassword == '') return res.status(400).send({ message: `Entry your old password` });
        if (!newPassword || newPassword == '') return res.status(400).send({ message: `Entry your new password` });

        if (!checkEncrypt(oldPassword, password)) return res.status(401).send({ mesasge: `Invalid credentials` });

        await User.findOneAndUpdate(
            { _id },
            { $set: { password: await encrypt(newPassword) } }
        );

        return res.send({ message: `Password modified successfully` });

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: `Error modifying password` });
    }
}

//eliminar cuenta personal - user
export const deleteUser = async (req, res) => {
    try {
        //obtenemos los datos del usuario logeado
        let { _id, password } = req.user;
        let data = req.body;

        //validar si el body tiene datos
        if (!data || Object.entries(data).length == 0) return res.status(400).send({ message: `Data empty` });

        //pedir contraseña de la cuenta para confirmar eliminacion
        if (!data.password || data.password == '') return res.status(400).send({ message: `Confirmation password required.` });

        if (!await checkEncrypt(data.password, password)) {
            return res.status(401).send({ message: `Invalid credentials.` });
        }

        await User.updateOne(
            { _id },
            { $set: { status: false } }
        )
        return res.send({ message: `Acount deleted successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: `Error deleting account.`, err });
    }
}


/* ADMIN AL ARRANCAR EL PROYECTO */
//funcion para crear un administrador por defecto.
export const createUser = async () => {
    try {
        let user = await User.findOne({ username: 'jnoj' });

        if (!user) {
            console.log('Creando usuario...')
            let admin = new User({
                name: 'Josue',
                surname: 'Noj',
                username: 'jnoj',
                password: '12345',
                email: 'jnoj@kinal.org.gt'
            });
            admin.password = await encrypt(admin.password);
            await admin.save();
            return console.log({ message: `Registered successfully. \nCan be logged with username ${admin.username} and pass 12345` })
        }

        console.log({ message: `Can be logged with username ${user.username} and password: 12345` });

    } catch (err) {
        console.error(err);
        return err;
    }
}