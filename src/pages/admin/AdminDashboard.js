import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <>
            <div>
                <Header />
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9" >
                            <div className="card w-75 p-3">
                                <hr />
                                <h4 className='text-center'>Admin Details</h4>
                                <hr />
                                <h5> Admin Name : {auth?.user?.name}</h5>
                                <h5> Admin Email : {auth?.user?.email}</h5>
                                <h5> Admin Contact : {auth?.user?.phone}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default AdminDashboard