import React, { Component } from 'react';
import Web3 from 'web3'
import HealthCare from './build/contracts/HealthCare.json'

// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class App extends Component {


  
  constructor(props){
    super(props);
    this.state={
      account:'',
      //buffer: null,
      contract: null,
      //HealthCareHash: ''
    };
  }

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //get the account
  //get the network
  //get smart contract
  //get HealthCare hash
  async loadBlockchainData(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts()
    this.setState({
      account: accounts[0]
    })
    const networkId = await web3.eth.net.getId()
    const networkData = HealthCare.networks[networkId]
    if(networkData){
      const abi = HealthCare.abi
      const address = networkData.address
//fetch contract
      const contract = new web3.eth.Contract(abi, address)
      this.setState({
        contract: contract
      })
      console.log(this.state.contract);
    //   const HealthCareHash = await contract.methods.get().call()
    //   this.setState({
    //     HealthCareHash: HealthCareHash
    //   })
    }else{
      window.alert("Smart contract not deployed to detected network")
    }
    
    console.log(networkId)


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

//   captureFile = (event) =>{
//     event.preventDefault()
//     console.log("File captured")
//     //process file for ipfs
//     const file = event.target.files[0] //file name
//     const reader = new window.FileReader()
//     reader.readAsArrayBuffer(file)
//     reader.onloadend = () =>{
//       this.setState({
//         buffer: Buffer(reader.result)  
//       })
//       console.log(this.state.buffer)

        
//     }
//   }

//   onSubmit = (event) =>{
//     event.preventDefault()
//     console.log("Submitting the form")
//     ipfs.add(this.state.buffer, (error, result) =>{
//       console.log('ipfs result',result)
//       const HealthCareHash = result[0].hash;
//       this.setState({
//         HealthCareHash: HealthCareHash
//       })
//       if(error){
//         console.error(error)
//         return
//       }
//       this.state.contract.methods.set(HealthCareHash).send({from : this.state.account}).then((r)=>{
//         this.setState({HealthCareHash})
//       })
//     })
//   }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-bottom bg-dark flex-md-nowrap p-0 shadow">
          <ul className="navbar-nav px-5">
            <li className="nav-item text-nawrap d-none d-sm-none d-sm-block">
              <large className="text-white">YOUR ADDRESS==> {this.state.account}</large>
            
            </li>
          
          </ul>
        </nav>
        </div>
    );
  }
};

export default App;
