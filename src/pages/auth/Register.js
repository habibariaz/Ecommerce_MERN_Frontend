import React, { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");


    const [error, setError] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        if (!name || !email || !password || !phone || !address || !answer) {
            setError("All fields are required.");
            return;
        }

        try {
            const res = await axios.post(`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/register`, {
                name,
                email,
                password,
                phone,
                address,
                answer
            });
            if (res && res.data.success) {
                alert(res.data && res.data.message);
                navigate("/login");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <>
            <Header />
           <div id="register_bg">
                <div className="row" style={{ margin: "0" }}>
                    <div className="col-sm-4 mb-3 mb-sm-0 registration_topmargin">
                        <div className="card" style={{ visibility: "hidden" }}>
                        </div>
                    </div>

                    <div className="col-sm-4 registration_topmargin" >
                        <div className="card registration_card_shadow ">
                            <div className="card-body">
                                <div className="text-center">
                                    <h3 className='mb-3'>Registration</h3>
                                </div>
                                <div className='registrationInputs_padding'>
                                    <form onSubmit={submit}>
                                        <div >
                                            <input type="text" value={name} name="name" className='form-control input-underline' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />
                                        </div><br />
                                        <div>
                                            <input type="text" value={email} name="email" className='form-control input-underline' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
                                        </div><br />
                                        <div>
                                            <input type="password" value={password} name="password" className='form-control input-underline' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                                        </div><br />
                                        <div>
                                            <input type="text" value={phone} name="phone" className='form-control input-underline' placeholder='Enter Phone' onChange={(e) => setPhone(e.target.value)} required />
                                        </div><br />
                                        <div>
                                            <input name="address" value={address} id="address" className='form-control input-underline' placeholder='Enter Address' onChange={(e) => setAddress(e.target.value)} required />
                                        </div><br />

                                        <div>
                                            <input type="text" value={answer} name="answer" id="answer" className='form-control input-underline' placeholder='Enter Your Role' onChange={(e) => setAnswer(e.target.value)} required />
                                        </div>

                                        <div className='mt-3 mb-3'>
                                            <span style={{ color: "red" }}>{error}</span>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-dark registrationBtn" onClick={submit}>SignUp</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 registration_topmargin">
                        <div className="card cards_border_none" style={{ visibility: "hidden" }}>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register
