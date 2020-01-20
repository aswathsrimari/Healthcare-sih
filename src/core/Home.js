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
        <Layout title="Home Page" description="Good day! Welcome to our completely decentralized HEALTHCARE application!" className="container-fluid">
           
        <h2 className="mb-4">Get started with our decentralized application</h2>
            <div className="row">
        <ul className="list-group">
            <li className="list-group-item">
            <Link className="nav-link" to="/user/dashboard">USER Sign Up/Login</Link>
            </li>

         </ul>

            </div>       
        </Layout>
    

    )
   

    }

export default Home;