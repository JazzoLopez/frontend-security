import useAuthStore from '@utils/store';
import React from 'react'
import { Navigate, Outlet,  } from 'react-router-dom';

export default function ProtectedRoutes() {
    const {token} = useAuthStore();
    return token ? <Outlet /> : <Navigate to="/login"  replace/>;
}
