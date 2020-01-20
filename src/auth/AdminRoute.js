import React, { Component, useState, useEffect, useLayoutEffect } from 'react'
import Layout from '../core/Layout'

import {Link} from 'react-router-dom'
import Web3 from 'web3'
import HealthCare from '../build/contracts/HealthCare.json'
import { async } from 'q'
import { thisExpression } from '@babel/types'




class AdminRoute extends Component{


    constructor(props){
        super(props);
        this.state={
            Bool:'',
            account:'',
            contract:'',
        }
        this.RedirectTo = this.RedirectTo.bind(this);
    }


  async componentWillMount(){
      await this.loadWeb3();
      await this.loadBlockchainData();
  }
  
  
    async loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    //console.log(accounts[0])
    const acc= accounts[0];
    console.log("Add",acc)
    this.setState({
        account:acc
    })
    //console.log(account)
    //console.log("gg");
    const networkId = await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    if(networkData){
      const abi = HealthCare.abi
      const address = networkData.address
//fetch contract
      const contract = new web3.eth.Contract(abi, address)
        this.setState({
            contract:contract
        })
      const res = await contract.methods.check().call({from: this.state.account});
      console.log("Res",res);
      //setBool(res);
      this.setState({
          Bool:res,
      })
      
    
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
  

  async loadWeb3() {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }else{
      window.alert('please use metamask!')
    }
  }

  RedirectTo(){
    if(this.state.Bool){
    return(
      <Layout title="You are already signed up!" description={`Click on the below link to view dashboard!`} >
        <div className="row">
            <div className="col-md-8 offset-md-2">
            <Link className="nav-link" to="/user/dashboardhere">Click to Enter dashboard</Link>

            </div>
        
        </div>
    </Layout>)
    }
    else{
      return(
        <Layout title="Ooops!You are not signed up" description={`Click on the below link to Sign up!`} >
        <div className="row">
            <div className="col-md-8 offset-md-2">
            <Link className="nav-link" to="/signin">Click to signin</Link>
            </div>
        
        </div>
    </Layout>)
    }
  }




render(){

  return(
    <div>

    {this.RedirectTo()}
    </div>



  )
    
}

};

export default AdminRoute;