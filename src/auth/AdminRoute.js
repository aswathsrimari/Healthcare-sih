import React, { Component, useState, useEffect } from 'react'
import {Route, Redirect} from 'react-router-dom'
import Web3 from 'web3'
import HealthCare from '../build/contracts/HealthCare.json'
import { async } from 'q'




const AdminRoute = ({component: Component, ...rest})=>{

  const [Bool,setBool] = useState();
  const [account,setAccount] = useState();
  const [contract,setContract] = useState();

 
  const checkDoctor = () =>{
    return Bool;
  }

  useEffect(()=>{
    loadWeb3();
    loadBlockchainData();
  },[])

  useEffect(()=>{
    console.log("BOOL",Bool);
      checkDoctor();
  },[Bool])

  async function loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    //console.log(accounts[0])
    const acc= accounts[0];
    setAccount(acc);
    //console.log(account)
    //console.log("gg");
    const networkId = await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    if(networkData){
      const abi = HealthCare.abi
      const address = networkData.address
//fetch contract
      const contract = new web3.eth.Contract(abi, address)
      setContract(contract);
      const res = await contract.methods.check().call();
      console.log("Res",res);
      setBool(true);
      //console.log(values);
     // const HealthCareHash = await contract.methods.get().call()
      //this.setState({
       // HealthCareHash: HealthCareHash
     // })
    }else{
      window.alert("Smart contract not deployed to detected network")
    }
    
   // console.log(networkId)


    //console.log(accounts)

  }
  

  async function loadWeb3() {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }else{
      window.alert('please use metamask!')
    }
  }





return(
  <Route 
     {...rest} 
     render={props => true ? (
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