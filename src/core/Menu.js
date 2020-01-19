import React, {ReactFragment, Fragment,useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Web3 from 'web3'
import HealthCare from '../build/contracts/HealthCare.json'
import { bool } from 'prop-types';
//withRouter will access Route history

const isActive = (history, path)=>{   //history is current url and path is clicked link
    if(history.location.pathname === path){
        return {color: '#ff9900'};
    }
    else{
        return {color: '#ffffff'};
    }
}


const Menu = ({history}) =>{


    return(
    <div>
        <ul className="nav nav-tab bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link> 
            </li>

            {true && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link> 
            </li>)}

            {true && (
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign in</Link> 
            </li>
            )}

        
         </ul>
    </div>
    );
}

export default withRouter(Menu);