import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart.js";
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";
import { useState } from "react";
import axios from "axios";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default payment method is Cash on Delivery

    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="container" style={{ height: "100vh" }}>
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        {cart?.map((p) => (
                            <div className="row mb-2 p-3 card flex-row">
                                <div className="col-md-4">
                                    <img
                                        src={`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        width="100px"
                                        height={"200px"}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price : {p.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total : {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/Dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/Dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/Login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Plase Login to checkout
                                    </button>
                                )}


                            </div>
                        )}
                        <div>
                            <p style={{ color: "Red" }}>Note: Payment is Cash On Delivery</p>
                        </div>
                    </div>
                </div>
            </div>



            <Footer />
        </>

    );
};

export default CartPage;
