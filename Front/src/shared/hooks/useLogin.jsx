import { useState } from 'react';
import toast from 'react-hot-toast'
import { loginRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (username, password) => {
        setIsLoading(true);
        const user = {
            username,
            password
        }
        const response = await loginRequest(user);
        setIsLoading(false);

        if (response.error) {
            return toast.error(
                response?.e?.response?.data ||
                'Error al logearse. Intenta de nuevo.'
            )
        }

        console.log(response);
        //userDetails?
        const { token } = response.data
        localStorage.setItem('token', token)

        toast.success('Bienvenido')
        navigate('/tasks')//redireccionamiento de pagina
    }

    return {
        login,
        isLoading
    }
}


