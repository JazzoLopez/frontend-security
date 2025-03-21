import { API_URL } from '../utils/config';

export const getLoans = async (token) => {
    try {
        const response = await fetch(`${API_URL}/loans`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error desconocido");
        }
        return await response.json();
    }
    catch (error) {
        throw error;
    }
}

export const updateLoan = async (token, loanId, loanData) => {
    try {
        const response = await fetch(`${API_URL}/loan/${loanId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(loanData)
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
export const deleteLoan = async (token, loanId) => {
    try {
        const response = await fetch(`${API_URL}/loan/${loanId}`, {
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

export const createLoan = async (token, loanData) => {
    try {
        const response = await fetch(`${API_URL}/loans`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Autorization": `Bearer ${token}`
            },
            body: JSON.stringify(loanData)
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