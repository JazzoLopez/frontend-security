import { API_URL } from '../utils/config';

export const login = async (data) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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

export const register = async (data) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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
};

