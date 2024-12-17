import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header.js'
import Footer from '../components/layout/Footer.js'
import axios from 'axios'
import { Prices } from '../components/prices/Prices.js'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart.js'


const Home = () => {
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useCart();

    const navigate = useNavigate()

    // get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/get-product`);
            setLoading(false);
            setProduct(data.product);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal COunt
    const getTotal = async () => {
        try {
            const { data } = await axios.get("https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/product-list/${page}`);
            setLoading(false);
            setProduct([...product, ...data?.product]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);


    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/product-filters", {
                checked,
                radio,
            });
            setProduct(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid row mt-3">
                <div className="col-md-2">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <label key={c._id}>
                                <input
                                    type="checkbox" style={{ marginRight: "5px" }}
                                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                                />
                                {c.name}
                            </label>
                        ))}
                    </div>

                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        {Prices?.map((p) => (
                            <div key={p._id}>
                                <label>
                                    <input
                                        type="radio"
                                        name="price"
                                        value={p.array}
                                        onChange={(e) => setRadio(e.target.value)}
                                    />
                                    {p.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {product?.map((p) => (
                            <div className="col-md-4 mb-3 text-align-center justify-content-center" key={p._id}>
                                <div className="card">
                                    <img
                                        src={`https://ecommerce-mern-backend-git-main-habiba-riazs-projects.vercel.app/api/v1/auth/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> $ {p.price}</p>
                                        <button
                                            className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>

                                        <button
                                            className="btn btn-secondary ms-1"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                alert("Item Added to cart")
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {product && product.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
