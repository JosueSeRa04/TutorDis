import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({isLoggedIn, children}){
    if(!isLoggedIn){
        return <Navigate to="/" />;
    }
    return children;
}

export default ProtectedRoute;