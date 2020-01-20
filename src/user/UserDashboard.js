import React, { useState, useEffect, Component } from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import Web3 from 'web3';
import HealthCare from "../build/contracts/HealthCare.json";
import { setServers } from 'dns';
import { render } from '@testing-library/react';


class Dashboard extends Component{


    constructor(props){
        super(props);
        this.state={
            patients:[],
            address:'',
            contract:'',
            submit:'',
            ans:'',
            name:'',
            age:'',
            disease:'',
            description:'',
            ehrHash:'',
            count:''
        }
        this.userLinks = this.userLinks.bind(this);
        this.patientinfo = this.patientinfo.bind(this);
        this.sendToDoctor = this.sendToDoctor.bind(this);
        this.viewPatients = this.viewPatients.bind(this);
        this.viewPrevPatients = this.viewPrevPatients.bind(this);
        
    }
    
    async componentWillMount(){
        await this.loadWeb3();
        await this.loadBlockchainData();
    }   
  
    

       async getFromBlockchain(){
            if(this.state.submit){
                const res = await this.state.contract.methods.getDoctorsCount().call();
                console.log("res",res);
                this.setState({
                    ans:res
                });
            }
           
        }
        

        async loadBlockchainData(){
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts()
            //console.log(accounts[0])
            const acc= accounts[0];
            this.setState({
                address:acc
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
                    contract:contract,
                    submit: true
                })
                const count = await this.state.contract.methods.getMyPatientsCount().call({from: this.state.address});
                this.setState({
                    count: count,
                    temp:1
                })
                
                //console.log(count)
                this.state.contract.methods.getMyPatients(this.state.temp).call({from: this.state.address}).then((r)=>{
                    this.setState({
                        name:r[1],
                        age:r[2],
                        disease:r[3],
                        description:r[4],
                        ehrHash:r[5]
                    })
                });
                // console.log("res",res);
                // this.setState({
                //     ans:res
                // });

                
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
        
    sendToDoctor(){
        console.log("Share with other doctors");



    }
    viewPatients(){
        if(this.state.temp<=this.state.count){
            this.setState({
                temp:this.state.temp+1
            })
        this.state.contract.methods.getMyPatients(this.state.temp).call({from: this.state.address}).then((r)=>{
            this.setState({
                name:r[1],
                age:r[2],
                disease:r[3],
                description:r[4],
                ehrHash:r[5]
            })
        });
    }
    else{
        console.log("no more patients")
    }
        

    }
    viewPrevPatients(){
        if(this.state.temp>=0){
            this.setState({
                temp:this.state.temp-1
            })
        this.state.contract.methods.getMyPatients(this.state.temp).call({from: this.state.address}).then((r)=>{
            this.setState({
                name:r[1],
                age:r[2],
                disease:r[3],
                description:r[4],
                ehrHash:r[5]
            })
        });
    }
    else{
        console.log("no more patients")
    }
        

    }
   
    patientinfo(){  
            return(
                
                <div className="card- mb-5">
                <h3 className="card-header">Name: {this.state.name}</h3>
                <ul className="list-group">
    
                   <li className="list-group-item">Age: {this.state.age}</li>
                   <li className="list-group-item">Disease: {this.state.disease}</li>
                   <li className="list-group-item">Description: {this.state.description}</li>
                   <img src={`https://ipfs.infura.io/ipfs/${this.state.ehrHash}`} className="App-logo" alt="EHR RECORD" />

                   <li className="list-group-item"><button className="btn btn-outline-primary" onClick={this.sendToDoctor}>SEND</button></li>
                   <li className="list-group-item"><button className="btn btn-outline-primary" onClick={this.viewPatients} type="submit">NEXT</button></li>
                   <li className="list-group-item"><button className="btn btn-outline-primary" onClick={this.viewPrevPatients} type="submit">PREV</button></li>


                </ul>
               </div>
              
            )
        }
    
       


    


    userLinks(){
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

    render(){
        return (
            <Layout title="Dashboard" description={`Good day !`} className="container-fluid">
                <div className="row">
                    <div className="col-3">
                    {this.userLinks()}
    
                    </div>
                    <div>


                   {this.patientinfo()}
                   
                    </div>
                </div>
            </Layout>
    
        );

    }
    
}

export default Dashboard;