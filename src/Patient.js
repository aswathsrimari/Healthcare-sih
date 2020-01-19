import React, {useState, useEffect} from 'react'
import Layout from './core/Layout'
import Web3 from 'web3';
import HealthCare from "./build/contracts/HealthCare.json";
import { Accounts } from 'web3-eth-accounts';
import { findAllByDisplayValue } from '@testing-library/dom';



const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


const CreatePatient = ()=>{

    const [values, setValues] = useState({
        
        name:'',
        age: '',
        disease:'',
        description: '',
        buffer:'',
        ehrHash:'',
        contract:'',
        formData : new FormData()

    })
    const [account,setAccount] = useState();
    const [submit,setSubmit] = useState();


    

  
    const {name,
    age,
    disease,
    description,contract,buffer,ehrHash
    } = values;

    useEffect(()=>{
        loadWeb3();
        loadBlockchainData();
        //console.log(values)
      },[]);

      useEffect(()=>{
        DisplayValues();
      },[values,account])

      useEffect(()=>{
        addToBlockchain();
      },[submit])

      const DisplayValues = () =>{
        //console.log(account,values)
      }

      const addToBlockchain = () =>{
        if(submit){
          contract.methods.sendDetails(name,age,disease,description,ehrHash).send({from : account}).then((r)=>{
            setValues({...values,ehrHash:ehrHash})
          })
        }
      }

    
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
         setValues({...values,contract: contract});
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
    

    const handleChange =name => event =>{
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        //formData.set(name, value)
        setValues({...values, [name]: value})

    }

    const clickSubmit = event =>{
        event.preventDefault()
        setValues({...values});
        //console.log(values)
        ipfs.add(buffer, (error, result) =>{
            console.log('ipfs result',result)
            const HealthCareHash = result[0].hash;
            setValues({...values,ehrHash:HealthCareHash});
            //console.log(values);
            if(error){
              console.error(error)
              return
            }
            setSubmit(true);
           
          })

        
    }

    const captureFile = (event) =>{
        event.preventDefault()
        console.log("File captured")
        //process file for ipfs
        const file = event.target.files[0] //file name
        console.log(file)
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        //console.log(Buffer(reader.result))

        reader.onloadend = () =>{
          setValues({...values,buffer:Buffer(reader.result)});
          console.log(values)         
        }
      }



    const newPostForm = () =>(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4> Upload EHR </h4>
            <div className="form=group">
                <label className="btn btn-secondary">
                <input onChange={(e)=>captureFile(e)} type="file" name="photo" accept="image/*"/>
                </label>
            </div>
            
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />     
            
            </div>

            <div className="form-group">
                <label className="text-muted">age</label>
                <input onChange={handleChange('age')} type="text" className="form-control" value={age} />     
            
            </div>
            <div className="form-group">
                <label className="text-muted">Disease</label>
                <input onChange={handleChange('disease')} type="text" className="form-control" value={disease} />     
            
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />     
            
            </div>

            <button className="btn btn-outline-primary">Create Patient</button>


        </form>
    );

        
    



    return(
        <Layout title="Add a new patient" description={`Good day , ready to add new patient!`} >
        <div className="row">
            <div className="col-md-8 offset-md-2">
           
             {newPostForm()}
            </div>
        
        </div>
    </Layout>

    )

}



export default CreatePatient;