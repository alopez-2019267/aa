import { useState } from "react";
import toast from "react-hot-toast";
import { registerRequest } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (name, surname, username, email, password) => {
        setIsLoading(true);
        const user = {
            name,
            surname,
            username,
            email,
            password
        }
        const response = await registerRequest(user)
        setIsLoading(false);

        if (response.error) {
            //error del back
            if (response?.err?.response?.data?.errors) {
                let arr = response?.err?.response?.data?.errors
                for (const error of arr) {
                    return toast.error(
                        error.message
                    )
                }
            }
            //error en front
            return toast.error(
                response?.err?.response?.data?.message ||
                response?.err?.data?.message ||
                'Error al registrarse. Intente de nuevo.'
            )
        }

        navigate('/tasks');
    }
    return (
        register,
        isLoading
    )
}
