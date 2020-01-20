import React, { useState, useEffect, Component } from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import Web3 from 'web3';
import HealthCare from "../build/contracts/HealthCare.json";


class Doctor extends Component{
    constructor(props){
       super(props);
       this.state={
           doctorCount:props.count,
           contract: props.contract,
           address: props.address,
           name:props.name,
            age:props.age,
            disease:props.disease,
            description:props.description,
            ehrHash:props.ehrHash,
            doct :[],
            done:false
       }
       this.getDoctor = this.getDoctor.bind(this);
       this.shareToDoctor = this.shareToDoctor.bind(this);
    }

    componentWillMount(){
        this.getDoctor();
    }
    getDoctor(){
        for(var i=1;i<=this.state.doctorCount;i++){
            this.state.contract.methods.getDoctors(i).call({from: this.state.address}).then((n)=>{
                    this.state.doct.push(n);
            })
        }

    }

    doctorsInfo(){  
        return(
            <div className="card- mb-5">
            <ul className="list-group">

               <li className="list-group-item">Name: {this.state.name}</li>

               
               <li className="list-group-item"><button className="btn btn-outline-primary" onClick={this.sendToDoctor}>SEND</button></li>
               <li className="list-group-item"><button className="btn btn-outline-primary" onClick={this.viewPatients} type="submit">NEXT</button></li>
               <li className="list-group-item"><button className="btn btn-outline-primary" onClick={this.viewPrevPatients} 
               type="submit">PREV</button></li>
               {this.state.clicked ? <Doctor count={this.state.doctorsCount} contract={this.state.contract} address={this.state.address} /> : null}


            </ul>
           </div>
          
        )
    }
    shareToDoctor(event){
        const val = event.target.value;
        console.log(val)
        this.state.contract.methods.sendDetails(this.state.name,this.state.age,this.state.disease,this.state.description,this.state.ehrHash,val)
        .send({from:this.state.address}).then((r)=>{
            console.log("Transaction", r);
            this.setState({
                done:true
            })
        })
    }

    render(){

        //console.log(this.state.doct)

        return(
                <div className="row">
                    <div className="col-9">
                    <ul>
                    List of Doctors:    
                    {this.state.doct.map((name,i) => <li className="list-group-item"><button type="submit" className="btn btn-outline-primary" 
                    onClick={this.shareToDoctor} value={i+1}>{i+1}: {name}</button></li>
                    )}
                    {this.state.done && (<li className="list-group-item">Sent sucessfully</li>)}           

                    </ul>
                    </div>
                </div>
            )
    }
}
export default Doctor;