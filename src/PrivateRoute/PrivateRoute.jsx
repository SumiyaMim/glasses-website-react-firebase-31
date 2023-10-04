/* eslint-disable no-unused-vars */
import React from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const { user, loading } = useAuth();

    // we have to wait here 
    if (loading) return <h1 className="text-4xl">Loading...</h1>

    if (!user?.email) {
        return <Navigate to='/login' />
    }

  return children
}

export default PrivateRoute
