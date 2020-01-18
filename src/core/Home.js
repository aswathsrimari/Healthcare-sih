import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {Card} from './Card';
import {Link} from 'react-router-dom'

const Home = () => {
   
    
    

    // const loadProductBySell = () =>{
    //     getProducts('sold').then(data=>{
    //         if(data.error){
    //             setError(data.error)
    //         }else{setProductBySell(data)}
    //     })

    // }
    
    // const loadProductByArrival = () =>{
    //     getProducts('createdAt').then(data=>{
    //         if(data.error){
    //             setError(data.error)
    //         }else{setProductByArrival(data)}
    //     });

    // }
    // useEffect(()=>{
    //     loadProductByArrival()
    //     loadProductBySell()
    // },[])

    return(
        <Layout title="Home Page" description="HEALTHCARE UNIT" className="container-fluid">
           
        <h2 className="mb-4">Click your designation</h2>
            <div className="row">
        <ul className="list-group">
            <li className="list-group-item">
            <Link className="nav-link" to="/user/dashboard">Doctor</Link>
            </li>
            <li className="list-group-item">
            <Link className="nav-link" to="/patient/dashboard">Patient</Link>                
            </li>

         </ul>

            </div>       
        </Layout>
    

    )
   

    }

export default Home;