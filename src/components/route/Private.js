import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import React from 'react'
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.js";

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const autoCheck = async () => {
            const res = await axios.get(`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/user-auth`)
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) autoCheck()
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />
}

export default PrivateRoute
