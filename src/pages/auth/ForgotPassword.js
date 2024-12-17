import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("")


    const forgotPassword = async (e) => {
        e.preventDefault();

        if (!email || !answer || !newPassword) {
            setError("All Fields Are Required")
        }

        try {
            const res = await axios.post(`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/forgot-password`, {
                email,
                answer,
                newPassword,
            })
            console.log(res)

            if (res && res.data.success) {
                alert(res.data && res.data.message);
                navigate("/Login");
            } else {
                alert(res.data.message);
            }

        }
        catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    return (
        <>
            <Layout>
                <div className="row" style={{ margin: "0", marginTop: "100px", marginBottom: "100px" }}>
                    <div className="col-sm-4 mb-3 mb-sm-0 registration_topmargin">
                        <div className="card">
                        </div>
                    </div>
                    <div className="col-sm-4 registration_topmargin" >
                        <div className="card registration_card_shadow ">
                            <div className="card-body">
                                <div className="text-center">
                                    <h3 className='mb-3'>Forgot Password</h3>
                                </div>
                                <div className='registrationInputs_padding'>
                                    <form onSubmit={forgotPassword}>
                                        <div>
                                            <input type="text" value={email} name="email" className='form-control input-underline' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                                        </div><br />
                                        <div>
                                            <input type="password" value={newPassword} name="newPassword" className='form-control input-underline' placeholder='Enter New Password' onChange={(e) => setNewPassword(e.target.value)} />
                                        </div><br />

                                        <div>
                                            <input type="text" value={answer} name="answer" className='form-control input-underline' placeholder='Enter Your Role' onChange={(e) => setAnswer(e.target.value)} required />
                                        </div>


                                        <div className='mt-3 mb-3'>
                                            <span style={{ color: "red" }}>{error}</span>
                                        </div>

                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn btn-dark registrationBtn">Reset</button>
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
            </Layout>
        </>
    )
}

export default ForgotPassword
