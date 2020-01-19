import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout'
import Web3 from 'web3';
import HealthCare from "../build/contracts/HealthCare.json";



const Signin=()=>{


    const [values,setValues] = useState({
        name:'',
        age:'',
        designation:'',
        contract:'',
        formData : new FormData()

    });
    const [account,setAccount] = useState();
    const [submit,setSubmit] = useState(false);
   
     const {name,age,designation,contract} = values;



     useEffect(()=>{
        loadWeb3();
        loadBlockchainData();
     },[])

     useEffect(()=>{
         displayValues();
     },[values,account])

     useEffect(()=>{
        addToBlockchain();
     },[submit])

     const displayValues = () =>{
         //console.log(account, values);
     }


     const addToBlockchain = () =>{
        if(submit){
          console.log(name,age,designation,account);
          contract.methods.addDoctors(name,age,designation).send({from : account}).then((r)=>{
            setValues({...values})
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
        
        console.log(networkId)
    
    
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
        const value = event.target.value
        //formData.set(name, value)
        setValues({...values, [name]: value})

    }

    const clickSubmit = event =>{
        event.preventDefault()
        setValues({...values});
       // console.log(values)
        setSubmit(true);   
    }

    const newPostForm = () =>(
        <form className="mb-3" onSubmit={clickSubmit}>
                        
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />     
            
            </div>

            <div className="form-group">
                <label className="text-muted">age</label>
                <input onChange={handleChange('age')} type="text" className="form-control" value={age}  />     
            
            </div>
            <div className="form-group">
                <label className="text-muted">Designtation</label>
                <input onChange={handleChange('designation')} type="text" className="form-control" value={designation}/>     
            
            </div>
            <button className="btn btn-outline-primary">Create Patient</button>


        </form>
    );


    return(
        <Layout title="Doctor registration" description={`Good day , ready to signin!`} >
        <div className="row">
            <div className="col-md-8 offset-md-2">
           
             {newPostForm()}
            </div>
        
        </div>
    </Layout>
    );



}


export default Signin;