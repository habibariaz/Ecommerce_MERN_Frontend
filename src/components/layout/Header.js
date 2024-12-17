import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/Cart'

const Header = () => {

    const [auth, setAuth] = useAuth();
    const [cart] = useCart();

    const logout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        })
        localStorage.removeItem("auth");
        alert("Logout Successfully...!!!")
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand"> 🛒 AHA Trendy</a>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/'>Home</NavLink>
                            </li>

                            {/* <li className="nav-item dropdown">
                                <NavLink
                                    className="nav-link dropdown-toggle"
                                    to="/Category"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    activeClassName="active"
                                >
                                    Category
                                </NavLink>

                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Category1</a></li>
                                    <li><a className="dropdown-item" href="#">Category2</a></li>
                                </ul>
                            </li> */}

                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to='/SignUp'>Register</NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink className="nav-link" to='/Login'>Login</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink
                                                        to={`/Dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                            }`}
                                                        className="dropdown-item"
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={logout}
                                                        to="/Login"
                                                        className="dropdown-item"
                                                    >
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )
                            }

                            <li className="nav-item">
                                <NavLink className="nav-link" to='/Cart'>Cart {cart?.length}</NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header