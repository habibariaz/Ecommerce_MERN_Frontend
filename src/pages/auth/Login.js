import React, { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [auth, setAuth] = useAuth();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            setError("All Fields Are Required.")
            return
        }

        try {
            const res = await axios.post(`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/login`, {
                email,
                password
            });

            if (res && res.data.success) {
                alert(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem("auth", JSON.stringify(res.data));
                // console.log("Attempting to navigate to /...");
                navigate(location.state || "/");
                // console.log("Navigation executed.");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header />
            <div className="row" style={{ margin: "0", marginTop: "100px", marginBottom: "100px" }}>
                <div className="col-sm-4 mb-3 mb-sm-0 registration_topmargin">
                    <div className="card">
                    </div>
                </div>
                <div className="col-sm-4 registration_topmargin" >
                    <div className="card registration_card_shadow ">
                        <div className="card-body">
                            <div className="text-center">
                                <h3 className='mb-3'>Login</h3>
                            </div>
                            <div className='registrationInputs_padding'>
                                <form onSubmit={login}>
                                    <div>
                                        <input type="text" value={email} name="email" className='form-control input-underline' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                                    </div><br />
                                    <div>
                                        <input type="password" value={password} name="password" className='form-control input-underline' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <div className='mt-3 mb-3'>
                                        <span style={{ color: "red" }}>{error}</span>
                                    </div>

                                    <div className="text-center mb-3">
                                        <button type="submit" className="btn btn-dark registrationBtn">Login</button>
                                    </div><hr />

                                    <div className="text-center ">
                                        <button type="submit" className="btn btn-danger registrationBtn" onClick={() => navigate("/forgot-password")}>Forgot Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4 registration_topmargin">
                    <div className="card cards_border_none">
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login
