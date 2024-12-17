import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
import UserMenu from "../../components/layout/UserMenu.js";
import Header from "../../components/layout/Header.js";
import Footer from "../../components/layout/Footer.js";


const Profile = () => {

    const [auth, setAuth] = useAuth();

    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone) {
            alert("Name, Email, and Phone are required.");
            return;
        }

        try {
            const { data } = await axios.put("http://localhost:8000/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                alert(data?.error)

            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                alert("Profile Updated Successfully");
                console.log("Request Body in handleSubmit:", { name, email, password, phone, address });

            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };
    return (
        <>
            <Header />
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    <div className="col-md-6" style={{ marginLeft: "50px" }}>
                        <div className="form-container ">
                            <form onSubmit={handleSubmit}>
                                <hr />
                                <h4 className="text-center">USER PROFILE</h4>
                                <hr />
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Name"
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Email "
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Enter Your Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Phone"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Address"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;