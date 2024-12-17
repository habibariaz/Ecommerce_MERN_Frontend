// // import React from 'react'
// import Header from '../../components/layout/Header.js'
// import UserMenu from '../../components/layout/UserMenu.js'
// import Footer from '../../components/layout/Footer.js'
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/auth.js";
// import axios from 'axios';

// const Orders = () => {
//     const [orders, setOrders] = useState([]);
//     const [auth, setAuth] = useAuth();

//     return (
//         <>
//             <div title={"Dashboard - Create Category"}>
//                 <Header />
//                 <div className="container-fluid m-3 p-3">
//                     <div className="row">
//                         <div className="col-md-3">
//                             <UserMenu />
//                         </div>
//                         <div className="col-md-9">
//                             <h1>All Orders</h1>
//                             <p>{JSON.stringify(orders, null, 4)}</p>
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </div>
//         </>
//     )
// }

// export default Orders