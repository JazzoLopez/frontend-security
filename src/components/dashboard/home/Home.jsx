import React, { useEffect, useState } from 'react';
import useAuthStore from '@utils/store';
import ResponsiveAppBar from '@components/ResponsiveBar/ResponsiveAppBar';
import { getUser } from '@services/userService';
import './styles.css';

export default function Home() {
  const { token } = useAuthStore();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const data = await getUser(token);
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [token]);

  return (
    <div className=""><ResponsiveAppBar /> <div className="container">

      <div className="card">
        <h2>Perfil de Usuario</h2>
        {userData ? (
          <div>
            <p><strong>Nombre:</strong> {userData.first_name} {userData.last_name} {userData.middle_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Rol:</strong> {userData.user_type}</p>
            <p><strong>Teléfono:</strong> {userData.phone_number}</p>
          </div>
        ) : (
          <p className="loading">Cargando información...</p>
        )}
      </div>
    </div>
    </div>

  );
}
