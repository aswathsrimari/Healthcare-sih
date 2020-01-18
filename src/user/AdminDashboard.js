import React from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'


const PatientDashboard = () =>{
   


    const adminLinks = () =>{
        return (
            <div className="card">
            <h4 className="card-header"> Doctor Links </h4>
            <ul className="list-group">
                
                <li className="list-group-item">
                <Link className="nav-link" to="/send/patient">Send Patient</Link>                
                </li>

             </ul>
            
            </div>
        );
    };

    // const adminInfo = () =>{
    //     return (
    //         <div className="card- mb-5">
    //         <h3 className="card-header">Admin Information</h3>
    //         <ul className="list-group">

    //            <li className="list-group-item">{name}</li>
    //            <li className="list-group-item">{email}</li>
    //            <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"} </li>
    //         </ul>
    //        </div>
          
    //     )
    // };

   

    return (
        <Layout title="Dashboard" description={`Good day !`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                 {adminLinks()}
                </div>
                <div className="col-9">
                                </div>
            </div>
        </Layout>

    );
}

export default PatientDashboard;