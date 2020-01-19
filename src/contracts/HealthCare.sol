pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract HealthCare {
    struct Doctor{
        address myaddress;
        string name;
        uint age;
        string field;
        uint myPatientsCount;
        mapping(uint=>Patient) myPatients;
    }
    struct Patient {
        address docaddress;
        string name;
        uint age;
        string disease;
        string description;
        string ehrhash;
    }
    uint public doctorsCount = 0;
    uint public patientsCount = 0;
    mapping(uint=>Doctor) public doctors;
    mapping(address=>bool) public added;
    function addDoctors(string memory name, uint age, string memory field) public returns (bool result){
        if(added[msg.sender]!=true) {
            doctors[++doctorsCount] = Doctor(msg.sender,name,age,field,0);
            return true;
        }
        else {
            return false;
        }
    } 
    
    
   function getDoctorsCount() public view returns (uint) {
        return doctorsCount;
    }

    function getMyPatients(uint doc_id, uint pos) public view returns (Patient memory){
        return doctors[doc_id].myPatients[pos];
    }

    function sendDetails(string memory name, uint age, string memory disease,string memory des,string memory Hash) public {
        uint doc_id;
        for(uint i = 0;i<doctorsCount;i++){
            if(doctors[i].myaddress==msg.sender){
                doc_id = i;
                break;
            }
        }
        doctors[doc_id].myPatients[++doctors[doc_id].myPatientsCount] = Patient(msg.sender,name,age,disease,des,Hash);
    }

    function check() public view returns (bool) {
        for(uint i = 0;i<doctorsCount;i++) {
            if(doctors[i].myaddress==msg.sender) {
                return true;
            }
        }
        return false;
    }
}