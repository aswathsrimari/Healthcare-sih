import React from 'react';
import  {BrowserRouter, Switch, Route} from 'react-router-dom';
//to access route parameters

import Home from './core/Home'
import Dashboard from './user/UserDashboard';

import PatientDashboard from './user/AdminDashboard';

import CreatePatient from './user/Patient'


const Routes = ()=>{
    return (
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Home}/>
            
            <Route path="/user/dashboard" exact component={Dashboard} />
            <Route path="/patient/dashboard" exact component={PatientDashboard}/>    
            <Route path="/create/patient" exact component={CreatePatient}/>    

            
        </Switch>
        
        </BrowserRouter>
        );
};

export default Routes;