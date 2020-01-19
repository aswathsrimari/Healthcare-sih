import React from 'react';
import  {BrowserRouter, Switch, Route} from 'react-router-dom';
//to access route parameters

import Home from './core/Home'
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute'

import PatientDashboard from './user/AdminDashboard';
import Signin from './auth/index'
import CreatePatient from './Patient'


const Routes = ()=>{
    return (
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/user/dashboardhere" exact component={Dashboard} />

            <AdminRoute path="/user/dashboard" exact component={AdminRoute} />
            <Route path="/patient/dashboard" exact component={PatientDashboard}/>    
            <Route path="/create/patient" exact component={CreatePatient}/>    

            
        </Switch>
        
        </BrowserRouter>
        );
};

export default Routes;