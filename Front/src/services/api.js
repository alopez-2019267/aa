import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:2657',
    timeout: 1000
});

//Interceptor para inyectar token si está logeado
apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem('user');
        if (userDetails) {
            config.headers.Authorization = userDetails;
        }
        return config;
    },
    (err) => Promise.reject(err)
)

//consulta al back para registrarnos
export const registerRequest = async (user) => {
    try {
        return await apiClient.post('/user/register', user);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//consulta a back para logearnos
export const loginRequest = async (data) => {
    try {
        return await apiClient.post('/user', data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

/*=============================== */
//             USERS             //
/*=============================== */

//consulta para modificar perfil del usuario logeado
export const modifyUserRequest = async (user) => {
    try {
        return await apiClient.put(`/user/modify`, user);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//consulta para cambiar la password
export const passwordUserRequest = async (data) => {
    try {
        return await apiClient.put('/user/password', data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//consulta para eliminar cuenta personal
export const deleteUserRequest = async(data)=>{
    try {
        return await apiClient.put('/user/delete', data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

/*=============================== */
//             TASKS             //
/*=============================== */

//consulta para crear las tareas
export const createTaskRequest = async (data) => {
    try {
        return await apiClient.post('/task/create', data);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//consulta para traer las tareas
export const getTasksRequest = async () => {
    try {
        return await apiClient.get('/task/');
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//consulta para modificar las tareas
export const modifyTaskRequest = async (id, task) => {
    try {
        return await apiClient.put(`/task/modify/${id}`, task);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//consulta para eliminar tareas
export const deleteTaskRequest = async (id) => {
    try {
        return await apiClient.delete(`/task/delete/${id}`);
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}