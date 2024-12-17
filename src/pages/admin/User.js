import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import AdminMenu from '../../components/layout/AdminMenu'

const User = () => {
    return (
        <>
            <div title={"Dashboard - All Users"}>
                <Header />
                <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
                        </div>
                        <div className="col-md-9">
                            <h1>All Users</h1>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default User