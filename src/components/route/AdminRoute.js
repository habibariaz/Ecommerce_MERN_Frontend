import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const autoCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) autoCheck()
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="/" />

}

export default AdminRoute