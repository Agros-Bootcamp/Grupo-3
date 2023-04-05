import { tb_user } from "../model/userProfile.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    const { first_name_user, last_name_user, email_user, password_user, fk_id_rol_user } = req.body
    const hashedPWD = await bcrypt.hash(password_user, 10)
    try {
        const result = await tb_user.create({
            first_name_user,
            last_name_user,
            email_user,
            password_user: hashedPWD,
            fk_id_rol_user
        })

        result && res.json(result)
    } catch (error) {
        res.json(error)
    }
}

export const listUsers = async (req, res) => {
    try {
        const users = await tb_user.findAll();
        res.json(users);
    } catch (error) {
        res.json(error);
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params; // Obtiene el id del usuario a actualizar desde los parámetros de la solicitud
    const { first_name_user, last_name_user, email_user, password_user } = req.body; // Obtiene los nuevos datos del usuario desde el cuerpo de la solicitud
    const hashedPWD = await bcrypt.hash(password_user, 10)

    try {
        // Busca el usuario a actualizar en la base de datos
        const userToUpdate = await tb_user.findOne({ where: { pk_id_user: id } });

        // Si el usuario no existe, devuelve un error
        if (!userToUpdate) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualiza los datos del usuario con los nuevos valores
        userToUpdate.first_name_user = first_name_user;
        userToUpdate.last_name_user = last_name_user;
        userToUpdate.email_user = email_user;
        userToUpdate.password_user = hashedPWD;
        await userToUpdate.save(); // Guarda los cambios en la base de datos

        // Devuelve los nuevos datos del usuario actualizado
        res.json(userToUpdate);
    } catch (error) {
        res.json(error);
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params; // Obtiene el id del usuario a eliminar desde los parámetros de la solicitud

    try {
        // Busca el usuario a eliminar en la base de datos
        const userToDelete = await tb_user.findOne({ where: { pk_id_user: id } });

        // Si el usuario no existe, devuelve un error
        if (!userToDelete) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Elimina el usuario de la base de datos
        await userToDelete.destroy();

        // Devuelve un mensaje de éxito
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.json(error);
    }
};