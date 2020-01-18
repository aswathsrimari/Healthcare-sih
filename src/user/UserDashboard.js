import React from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
const Dashboard = () =>{
   


    const patientInfo = () =>{
            return (
                <div className="card- mb-5">
                <h3 className="card-header">Patient Information</h3>
                <ul className="list-group">
    
                   <li className="list-group-item">name</li>
                   <li className="list-group-item">age</li>
                   <li className="list-group-item">disease</li>
                   <li className="list-group-item">description</li>
                </ul>
               </div>
              
            )
        };
    


    const userLinks = () =>{
        return (
            <div className="card">
            <h4 className="card-header"> User Links </h4>
            <ul className="list-group">
                <li className="list-group-item">
                <Link className="nav-link" to="/create/patient">Add patient</Link>
                </li>
             </ul>
            
            </div>
        );
    };

    // const userInfo = () =>{
    //     return (
    //         <div className="card- mb-5">
    //         <h3 className="card-header">User Information</h3>
    //         <ul className="list-group">
    //            <li className="list-group-item">{name}</li>
    //            <li className="list-group-item">{email}</li>
    //            <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"} </li>
    //         </ul>
    //        </div>
          
    //     )
    // };

    // const purchaseHistory = () =>{
    //     return (
    //         <div className="card">
    //         <h3 className="card-header">Purchase History</h3>
    //         <ul className="list-group">
    //             <li className="list-group-item">history</li>
    //         </ul>    
    //         </div>

    //     )
    // }

    return (
        <Layout title="Dashboard" description={`Good day !`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                {userLinks()}

                </div>
                <div className="col-9">
            
                {patientInfo()}
               
                </div>
            </div>
        </Layout>

    );
}

export default Dashboard;