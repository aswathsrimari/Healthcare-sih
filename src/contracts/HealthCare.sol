pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract HealthCare {
    struct Doctor{
        string name;
        uint age;
        string field;
        uint myPatientsCount;
        mapping(uint=>Patient) myPatients;
    }
    struct Patient {
        address myDocAddress;
        string name;
        uint age;
        string disease;
        string description;
        string ehrhash;
    }
    uint public doctorsCount = 0;
    mapping(address=>Doctor) public doctors;
    mapping(address=>bool) public added;
    mapping(uint=>address) public index;
    function addDoctors(string memory name, uint age, string memory field) public {
        if(added[msg.sender]!=true) {
            doctors[msg.sender] = Doctor(name,age,field,0);
            added[msg.sender] = true;
            index[++doctorsCount] = msg.sender;
        }
    }
   function getDoctorsCount() public view returns (uint) {
        return doctorsCount;
    }

    function getDoctors(uint pos) public view returns (string memory) {
        return doctors[index[pos]].name;
    }

    function getMyPatientsCount() public view returns (uint) {
        return doctors[msg.sender].myPatientsCount;
    }

    function getMyPatients(uint pos) public view returns (Patient memory) {
        return doctors[msg.sender].myPatients[pos];
    }

    function addPatients(string memory name, uint age, string memory disease,string memory des,string memory Hash) public {
        doctors[msg.sender].myPatients[++doctors[msg.sender].myPatientsCount] = Patient(msg.sender,name,age,disease,des,Hash);
    }

    function sendDetails(string memory name, uint age, string memory disease, string memory des, string memory Hash, uint pos) public {
        address docAddress = index[pos];
        if(added[docAddress]==true) {
            doctors[docAddress].myPatients[++doctors[docAddress].myPatientsCount] = Patient(docAddress, name, age, disease, des, Hash);
        }
    }

    function check() public view returns (bool) {
        if(added[msg.sender]==true){
            return true;
        }
        return false;
    }
}