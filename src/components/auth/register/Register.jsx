import React, { useState } from 'react';
import './styles.css';
import { register } from '@services/authService';

export default function Register() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        middle_name: "",
        user_type: "",
        username: "",
        email: "",
        password: "",
        phone_number: "",
        status: "Active",
        registrationDate: new Date(),
        update_date: new Date(),
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(false);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await register(data);
            console.log("Registro exitoso:", response);
            setSuccessMessage("Usuario registrado exitosamente.");
        } catch (error) {
            setError(true);

            if (error?.detail) {
                setErrorMessage(error.detail[0]?.msg || "Ocurrió un error");
            } else {
                setErrorMessage("Ocurrió un error inesperado");
            }
        } finally {
            setLoading(false);
        }
    };

    console.log(data);

    return (
        <div className="register">
            <form className="form-register" onSubmit={handleSubmit}>
                <div className="input-row">
                    <div className="input-group">
                        <span>Primer nombre</span>
                        <input type="text" name="first_name" className="input-text" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <span>Segundo nombre</span>
                        <input type="text" name="middle_name" className="input-text" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <span>Apellidos</span>
                        <input type="text" name="last_name" className="input-text" onChange={handleChange} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <span>Teléfono</span>
                        <input type="tel" name="phone_number" className="input-text" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <span>Nombre de usuario</span>
                        <input type="text" name="username" className="input-text" onChange={handleChange} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <span>Correo electrónico</span>
                        <input type="email" name="email" className="input-text" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <span>Contraseña</span>
                        <input type="password" name="password" className="input-text" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <span>Confirmar contraseña</span>
                        <input type="password" name="confirmPassword" className="input-text" onChange={handleChange} />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <span>Tipo de usuario</span>
                        <select name="user_type" className="input-text" onChange={handleChange}>
                            <option value="">Selecciona un tipo</option>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Secretary">Secretary</option>
                            <option value="LabTechnician">LabTechnician</option>
                            <option value="Executive">Executive</option>
                            <option value="Administrative">Administrative</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
                <div className="error-message">
                    {error && <span>Error: {errorMessage}</span>}
                </div>
                <div className="success-message">
                    {successMessage && <span>{successMessage}</span>}
                </div>
                <p className="login-link">
                    ¿Tienes cuenta? <a href="/login">Inicia sesión</a>
                </p>
            </form>
        </div>
    );
}