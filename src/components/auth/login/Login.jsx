import { useState } from 'react'
import { login } from '../../../services/authService'
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './styles.css'
import useAuthStore from '@utils/store'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { authLogin, token } = useAuthStore()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    console.log(data)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        setErrorMessage(null)

        try {
            const response = await login(data)
            authLogin(response.access_token)
            navigate('/home')
        } catch (error) {
            setError(true)
            setErrorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    if (token) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className='form-login'>
                <div className="imput-username">
                    <span className='email' id='email'>email</span>
                    <input type="text" name='email' id='email' onChange={handleChange} />
                </div>
                <div className="imput-password">
                    <span className='password' id='password'>Password</span>
                    <input type="password" name='password' id='password' onChange={handleChange} />
                </div>
                <Button variant='outlined' color='primary' type='submit' disabled={loading} endIcon={<SendIcon />} >Iniciar Sesion</Button>
            <span>No tienes cuenta? <a href="register">Registrate aqui</a></span>

            </form>
            <div className="error-message">
                {error && <span>Error: {errorMessage}</span>}
            </div>
        </div>
    )
}