import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    authLogin: (newToken) => {
        localStorage.setItem("token", newToken);
        set({ token: newToken })
    },
    authLogout: () => {
        localStorage.removeItem("token");
        set({ token: null })
    }
}))

export default useAuthStore