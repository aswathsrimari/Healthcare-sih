import React, { Component, useState, useEffect } from 'react'
import {Route, Redirect} from 'react-router-dom'
import Web3 from 'web3'
import HealthCare from '../build/contracts/HealthCare.json'
import { async } from 'q'



const isAuthenticated = async()=>{
    if(window.ethereum){
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider)
      }else{
        window.alert('please use metamask!')
      }
      const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    const acc = accounts[0];
    const networkId =  await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    if(networkData){
      const abi = HealthCare.abi
      const address = networkData.address
//fetch contract
      const contract = new web3.eth.Contract(abi, address)
      
      //console.log(this.state.contract);
      //console.log("bb")
      //console.log(contract);
      //console.log(accounts[0]);
      const Booli = await contract.methods.check().call();
      console.log("Block",Booli)
      return Booli;

    }else{
      window.alert("Smart contract not deployed to detected network")
    }
    
    //console.log(networkId)

}

const AdminRoute = ({component: Component, ...rest})=>{

  const [Bool,setBool] = useState();



  

  const isAuthenticat=async()=>{
    const res = await isAuthenticated();
    console.log("admin res",res)

    if(res===true){
      setBool(true)
    }
    else{
      setBool(false)
    }
  }

  const checkDoctor = () =>{
    console.log("admin Bool",Bool);
  }

  useEffect(()=>{
    isAuthenticat();

  },[])

  useEffect(()=>{
    checkDoctor();
  },[Bool])



return(
  <Route 
     {...rest} 
     render={props => Bool ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname: "/signin",
            state: {from: props.location}
        }} />

    )}
    />
  );
  
  };

export default AdminRoute;