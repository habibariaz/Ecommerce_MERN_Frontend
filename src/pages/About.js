import React from 'react'
import Layout from '../components/layout/Layout'
import about from '../images/aboutUs.jpg'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const About = () => {
    return (
        <>
            <div>
                <Header />
                <div className="container-fluid" style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <div class="row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                            <div class="card">
                                <div class="card-body">
                                    <img
                                        src={about}
                                        alt="contactus"
                                        className='img-fluid'
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-body">
                                    <h1 className="bg-dark p-2 text-white text-center">About</h1>
                                    <p className="text-justify align-items-center justify-content-center mt-3">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                                        officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                                        perferendis eius temporibus dicta blanditiis doloremque explicabo
                                        quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                                        accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                                        commodi illum quidem neque tempora nam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About