import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <>
                <Header />
               <div id="admin_bg3" >
                <div style={{ height: "100vh" }}>
                    <div className="row admin_topmargin" >
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>

                        <div className="col-md-9" style={{ overflow: "hidden" }}>
                            <h1 className='text-center admin_topmargin'>Admin Details</h1>
                            <hr />
                            <div className="card" style={{ backgroundColor: "#F2F4F1" }} >
                                <table class="table table-success table-striped" >
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: "bold" }}>Admin Name</td>
                                            <td>{auth?.user?.name}</td>
                                        </tr>

                                        <tr>
                                            <td style={{ fontWeight: "bold" }}>Admin Email</td>
                                            <td>{auth?.user?.email}</td>
                                        </tr>

                                        <tr>
                                            <td style={{ fontWeight: "bold" }}>Admin Contact</td>
                                            <td> {auth?.user?.phone}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* <div className="col-md-9" >
                            <div className="card w-75 p-3">
                                <hr />
                                <h4 className='text-center'>Admin Details</h4>
                                <hr />
                                <h5> Admin Name : {auth?.user?.name}</h5>
                                <h5> Admin Email : {auth?.user?.email}</h5>
                                <h5> Admin Contact : {auth?.user?.phone}</h5>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
                <Footer />
        </>
    )
}

export default AdminDashboard
