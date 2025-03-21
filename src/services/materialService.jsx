import { API_URL } from '../utils/config';

export const getMaterials = async (token) => {
    try {
        const response = await fetch(`${API_URL}/materials`, {
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

export const getMaterial = async (token, materialId) => {
    try {
        const response = await fetch(`${API_URL}/materials/${materialId}`, {
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

export const createMaterial = async (token, materialData) => {
    try {
        const response = await fetch(`${API_URL}/materials`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(materialData)
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

export const updateMaterial = async (token, materialId, materialData) => {
    try {
        const response = await fetch(`${API_URL}/materials/${materialId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(materialData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error desconocido");
        }
        return true;
    } catch (error) {
        throw error;
    }
};

export const deleteMaterial = async (token, materialId) => {
    try {
        const response = await fetch(`${API_URL}/materials/${materialId}`, {
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
    } catch (error) {
        throw error;
    }
};
