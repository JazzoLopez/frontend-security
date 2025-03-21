import { API_URL } from '../utils/config';
import { jwtDecode } from 'jwt-decode';


export const getUsers = async (token) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error desconocido");
        }
        return await response.json();
    }
    catch (error) {
        throw error;
    }
}

export const getUser = async (token) => {
    try {

        const decoded = jwtDecode(token);
        const userId = decoded.user_id;

        const response = await fetch(`${API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error desconocido");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (token, userId, userData) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error desconocido");
        }
        return true;
    }
    catch (error) {
        throw error;
    }
}
export const deleteUser = async (token, userId) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error desconocido");
        }
        return true;
    }
    catch (error) {
        throw error;
    }
}

export const createUser = async (token, userData) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Autorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData); // Verifica qué está recibiendo exactamente
            throw errorData; // Lanza el objeto JSON directamente
        }

        return await response.json();
    } catch (error) {
        throw error; // Mantén el objeto JSON en el catch
    }
}