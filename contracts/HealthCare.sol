// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract HealthCare{  
   
    address Owner;
    string s="Null";

    constructor()
    {
        Owner=msg.sender;
    }

// 1. Insurance company registration 

    mapping(address => insuranceCompany)public insuranceCompaniesmapping; // mapping to store details of insuranceCompany
    address[] public AllAddress; //all registered address will be in this list

    //details of insuranceCompany
    struct insuranceCompany{
        bool isalreadyexisting;
        string insuranceCompanyName;
        address insuranceCompanyWalletAddress; 
        uint insuranceCompanyregnum;
        string insuranceCompanyPassword;
    }
        
    //To check whether the insurance company is present in records
    function AddressExist(address UserAddress) public view returns  (bool)
    {
        if(AllAddress.length ==0)
            return false;
        else
        {
            
            for(uint i=0;i<AllAddress.length;i++)
            {
                if(AllAddress[i]==UserAddress)
                    return true;
            }
            
        return false;
        }
    }
    
    // modifier to ensure to ensure only admin can add insurance Companies
    modifier onlyOwner()
    {
        require (Owner == msg.sender);
        _;
    }

    // function to add insurance Companies
    uint regnum=0;
    function addInsuranceCompany(string memory _nameofInsuranceCompany,
                                 address _insuranceCompanyWalletAddress,
                                 string memory _insuranceCompanyPassword
                                 // In real world insuance companies have a registration ID with IRDA
                                 )
                                onlyOwner
                                public
                                returns(address)
                {
                    address insuranceCompanyId =_insuranceCompanyWalletAddress ; //genrate insurance Company ID which will be unique for each company
                    regnum+=1;
                    insuranceCompaniesmapping[insuranceCompanyId].isalreadyexisting = true;
                    insuranceCompaniesmapping[insuranceCompanyId].insuranceCompanyName = _nameofInsuranceCompany;
                    insuranceCompaniesmapping[insuranceCompanyId].insuranceCompanyWalletAddress = _insuranceCompanyWalletAddress;
                    insuranceCompaniesmapping[insuranceCompanyId].insuranceCompanyregnum = regnum;
                    insuranceCompaniesmapping[insuranceCompanyId].insuranceCompanyPassword = _insuranceCompanyPassword;
                    AllAddress.push(_insuranceCompanyWalletAddress);

                    return insuranceCompanyId;// returns unique address of insuranceCompany
                }


    // Insurance Company  Login
    function InsuranceCompanyLogin (address _insuranceCompanyWalletAddress,string memory _insuranceCompanyPassword) view public returns(int)
                {
                    
                    if(insuranceCompaniesmapping[_insuranceCompanyWalletAddress].isalreadyexisting == false)
                            return 0; // 0 means IC is not registered 
                    
                    else
                        {
                          string memory ICompany_Password= insuranceCompaniesmapping[_insuranceCompanyWalletAddress].insuranceCompanyPassword;

                          if(bytes(_insuranceCompanyPassword).length != bytes(ICompany_Password).length) 
                             return 2; // 2 means password is incorrect
                          else if (sha256(abi.encodePacked(_insuranceCompanyPassword)) == sha256(abi.encodePacked(ICompany_Password)))
                                return 1; // 1 means address and password are correct 
                          else 
                            return 2;
                        }
                }
                
// 2. Hospital registration and verification
    
    mapping(address => bool) public verifiedhospitals; // add hosptals to this mapping after 3 verifications
    mapping(address => hospital) public hospitalmapping; // to map unique address of hospital to all its details
    
    struct hospital{
        bool isalreadyexisting;
        string hospitalName;
        int hospitalregnum;
        address hospitalWalletAddress;
        int numverifications;
        string hospitalPassword;
        mapping(address => bool) insurCompWhohaveVerified;
    }
    
     // function to register a new hospital 
    function registerhospital (
                            string memory _hospitalName,
                            int _hospitalregnum,
                            address _hospitalWalletAddress,
                            string memory _hospitalPassword
                            )
                            public
                    { 
                        hospitalmapping[_hospitalWalletAddress].isalreadyexisting = true;
                        hospitalmapping[_hospitalWalletAddress].hospitalName = _hospitalName;
                        hospitalmapping[_hospitalWalletAddress].hospitalregnum = _hospitalregnum;
                        hospitalmapping[_hospitalWalletAddress].hospitalWalletAddress = _hospitalWalletAddress;
                        hospitalmapping[_hospitalWalletAddress].numverifications = 0;
                        hospitalmapping[_hospitalWalletAddress].hospitalPassword = _hospitalPassword;
                        AllAddress.push(_hospitalWalletAddress);
                    }

    //Hospital Login
    function HospitalLogin (address _hospitalWalletAddress,string memory _hospitalPassword) view public returns(int)
                {
    
                        if(verifiedhospitals[_hospitalWalletAddress]== false)
                            return 0; // 0 means hospital is not registered 
                        else if(verifiedhospitals[_hospitalWalletAddress]==false)
                            return 3; // 3 means hospital has registered but not yet verified by ICs
                        else
                        {
                          string memory Hospital_Password= hospitalmapping[_hospitalWalletAddress].hospitalPassword;

                          if(bytes(_hospitalPassword).length != bytes(Hospital_Password).length) 
                             return 2; // 2 means password is incorrect 
                          else if (sha256(abi.encodePacked(_hospitalPassword)) == sha256(abi.encodePacked(Hospital_Password)))
                                return 1; // 1 means correct address and password
                          else 
                            return 2;
                        }
                }
                
    modifier onlyInsuranceCompany()
    {
        require(insuranceCompaniesmapping[msg.sender].isalreadyexisting,"Only Insurance Company can verify");
        _;
    }
    
    modifier onlyOnce(address _hospitaladdress)
    {
        require(hospitalmapping[_hospitaladdress].insurCompWhohaveVerified[msg.sender]==false,"Can verify only once");
        _;
    }

    function verifyhospital(address _hospitaladdress) public onlyInsuranceCompany onlyOnce(_hospitaladdress)
    { 
        //onlyInsurance Company can verify
        hospitalmapping[_hospitaladdress].insurCompWhohaveVerified[msg.sender]=true;

        hospitalmapping[_hospitaladdress].numverifications++;
        if(hospitalmapping[_hospitaladdress].numverifications>=2) // add hospital to verifiedhospitals mapping
        {
            verifiedhospitals[_hospitaladdress]=true;
         }
    }
    
// 3. Customer registration
    mapping(address => customer) public customerData; // mapping to store customer Data
    address[] public AllCustomers;

    struct customer{
        bool alreadyexits;
        string customerName;
        address customerWalletAddress;
        string CustomerPassword;
        int[] policyId;
        bool[] paidpremium;
        uint[] suminsuredbypolicy;
        bool appliedForClaim;
        int[] billId;
        bool[] claimSettled;
        int[] claimId;
        bool[] verifiedUser;
    }
    
    
    //Function to register to the system
    function registerasacustomer(string memory _customerName,address _customerWalletAddress,string memory _CustomerPassword) public
    {
        customerData[_customerWalletAddress].alreadyexits = true;
        customerData[_customerWalletAddress].customerName = _customerName;
        customerData[_customerWalletAddress].customerWalletAddress = _customerWalletAddress;
        customerData[_customerWalletAddress].CustomerPassword = _CustomerPassword;
        customerData[_customerWalletAddress].appliedForClaim = false;
                                                
        AllAddress.push(_customerWalletAddress);
        AllCustomers.push(_customerWalletAddress);
    }
    
    // Customer Login
    function CustomerLogin (address _customerWalletAddress,string memory _CustomerPassword) view public returns(int)
                {
    
                    if(customerData[_customerWalletAddress].alreadyexits== false)
                            return 0; // 0 means customer is not registered 
                        
                    else
                        {  string memory Customer_Password= customerData[_customerWalletAddress].CustomerPassword;

                           if(bytes(_CustomerPassword).length != bytes(Customer_Password).length) 
                              return 2; // password is incorrect
                                   
                           else if(sha256(abi.encodePacked(_CustomerPassword)) == sha256(abi.encodePacked(Customer_Password)))
                            return 1; //1 means valid login credentials
                        
                           else return 2;
                        }
                }

//4. Creating new Policies by Insurance Company and policy structure
    mapping(int => policy) public policiesAvailable;// policyid => policy details
    int[] public AllPolicyID;
    mapping(address => address[]) public customersByInsranceCompany;

    struct policy{
        bool alreadyexits;
        string policyName;
        int policyId;
        uint insuranceCompanyregnum;
        string insuranceCompanyName;
        address payable insuranceCompanyAddress;
        uint premiumtobepaid;
        uint suminsuredbypolicy;
    }

    modifier onlyInusranceCompanyAddingPolicy(address _insuranceCompanyWalletAddress)
    {
        require(msg.sender==_insuranceCompanyWalletAddress && 
                insuranceCompaniesmapping[_insuranceCompanyWalletAddress].isalreadyexisting==true,
                "Only insurance Company whose wallet address is passed as argument can use this function");
        
        _;
    }
        function addnewpolicy(string memory _policyName,
                              int _policyId,
                              address payable _insuranceCompanyWalletAddress,
                              uint _premiumtobepaid,
                              uint _suminsuredbypolicy
                              ) 
                        onlyInusranceCompanyAddingPolicy(_insuranceCompanyWalletAddress)
                        public {
                        
                        policiesAvailable[_policyId].alreadyexits = true;
                        policiesAvailable[_policyId].policyName = _policyName;
                        policiesAvailable[_policyId].policyId = _policyId;
                        policiesAvailable[_policyId].insuranceCompanyregnum = insuranceCompaniesmapping[_insuranceCompanyWalletAddress].insuranceCompanyregnum;
                        policiesAvailable[_policyId].insuranceCompanyName = insuranceCompaniesmapping[_insuranceCompanyWalletAddress].insuranceCompanyName;
                        policiesAvailable[_policyId].insuranceCompanyAddress = _insuranceCompanyWalletAddress;
                        policiesAvailable[_policyId].premiumtobepaid = _premiumtobepaid;
                        policiesAvailable[_policyId].suminsuredbypolicy = _suminsuredbypolicy;
                        AllPolicyID.push(_policyId);
            }
        
//5. Customer Applies for Policies Available by paying Premiums

    function getPosition(address _PatientAddress, int _policyId) view public returns(uint) {
        uint check = 100;
        for (uint i = 0; i < customerData[_PatientAddress].policyId.length; i++) {
            if (customerData[_PatientAddress].policyId[i] == _policyId) {
                check = i;
            }
        }
        return check;
    }
    function applyforinsurance(int policyId) public{
        for (uint i = 0; i < customerData[msg.sender].policyId.length; i++) {
            if (customerData[msg.sender].policyId[i] == policyId) {
                revert("Already registered for the policy");
            }
        }
        require(customerData[msg.sender].alreadyexits,"You need to register first");
        require(policiesAvailable[policyId].alreadyexits,"No such policy exists!!!");
        customersByInsranceCompany[policiesAvailable[policyId].insuranceCompanyAddress].push(msg.sender);
        // require(customerData[msg.sender].policyId == 0,"You are already registered for another policy");
        customerData[msg.sender].policyId.push(policyId);
        customerData[msg.sender].claimId.push(0);
        customerData[msg.sender].paidpremium.push(false);
        customerData[msg.sender].claimSettled.push(false);
        customerData[msg.sender].verifiedUser.push(false);
        customerData[msg.sender].suminsuredbypolicy.push(policiesAvailable[policyId].suminsuredbypolicy);
    }
             
    modifier onlyTiedICompany(address _PatientAddress, int _policyId) 
    {
        require(policiesAvailable[_policyId].insuranceCompanyAddress ==insuranceCompaniesmapping[msg.sender].insuranceCompanyWalletAddress ,
        "Only Insurance Company of policy applied can verify");
        _;
    }

    function VerifyPatient(address _PatientAddress, int _policyId) payable public onlyTiedICompany( _PatientAddress, _policyId)
    {
        uint check = getPosition(_PatientAddress, _policyId);
        require(check != 100, "Not yet Applied for policy");
        require(msg.value == (customerData[_PatientAddress].suminsuredbypolicy[check]*30)/100, "Please add 30% of the premium sum amount");
        customerData[_PatientAddress].verifiedUser[check]=true;
    }   
 
    function paypremium(int _policyId) payable public {
        uint check = getPosition(msg.sender, _policyId);
        require(check != 100, "Not yet Applied for policy");
        require(customerData[msg.sender].verifiedUser[check]==true,"Application not yet verified by Insurance Company");
        uint256 _premiumtobepaid = policiesAvailable[_policyId].premiumtobepaid;
        require(msg.value == _premiumtobepaid, "Please add exact premium amount");
        address payable recipient = policiesAvailable[_policyId].insuranceCompanyAddress; 
        recipient.transfer(_premiumtobepaid);
        customerData[msg.sender].paidpremium[check]=true;
    }

//6. hospital generates bill for patient when patient goes for some treatment

    struct bill{
        int billId;
        uint amount;
        address patientAddress;
        address _hospitalwalletaddress;
        string description;
    }
    
    int billId=0;
    mapping(int => bill) public billmapping;
    
    modifier onlyHospital
    {
        require(verifiedhospitals[msg.sender],"Only hosptals can genrate bill");
        _;
    }
    
    
    function generatebBillforpatient(address _patientAddress,
                                     uint _amount,
                                     string memory _description)
                                     onlyHospital
                                     public
                                     {
                                         billId+=1;
                                         bill memory newBill=bill(billId,_amount,_patientAddress,msg.sender,_description);
                                         customerData[_patientAddress].billId.push(billId);
                                         billmapping[billId]=newBill;
                                     }
                                     
// 7. Customer claims Insurance using applyforclaim function and a claimId is genrated linking all details to a claim struct

     struct claim {
        bool exists;
        int claimId;
        int billId;
        uint amount;
        string description;
        bool claimSettled;
        address customerWalletAddress;
        address insuranceCompanyAddress;
    }
    
    int claimId=0;
    mapping(int =>claim) public claims ; // storing all claims(ClaimId => Claim details)
    mapping(address => int[]) public claimsByInsranceCompany;

    function applyforclaim(address _customerWalletAddress, int _policyId, int _billId) public
    {
        uint check = getPosition(_customerWalletAddress, _policyId);
        require(check != 100, "Not yet Applied for policy");
        require(customerData[_customerWalletAddress].paidpremium[check]==true,"Premium Not Paid");
        uint abc = 0;
        for (uint i = 0; i < customerData[_customerWalletAddress].billId.length; i++) {
            if (customerData[_customerWalletAddress].billId[i] == _billId) {
                abc = 1;
            }
        }
        require(abc == 1,"Bill Not generated");
        require(customerData[_customerWalletAddress].appliedForClaim==false && customerData[_customerWalletAddress].claimSettled[check]==false,
                "Already Applied for Claim!!") ;

        customerData[_customerWalletAddress].appliedForClaim=true;
        
        claimId+=1;
        
        customerData[_customerWalletAddress].claimId[check]=claimId;
        claim memory newClaim= claim(true,
                                    claimId,
                                    billmapping[_billId].billId,
                                    billmapping[_billId].amount,
                                    billmapping[_billId].description,
                                    false,
                                    _customerWalletAddress,
                                    policiesAvailable[_policyId].insuranceCompanyAddress
                                    );
        
        claims[claimId]=newClaim; // adds the claim to the claim mapping
        claimsByInsranceCompany[newClaim.insuranceCompanyAddress].push(claimId);
    }

//8. Insurance Company verifies and disburses the claim amount

    modifier onlyTiedInsuraceCompany(int _claimId)
    {
        require(claims[_claimId].insuranceCompanyAddress==msg.sender,"Functionality only for company providing the policy");
        require(claims[_claimId].exists==true,"The Claim does not exist");
        require(!claims[_claimId].claimSettled,"Claim has already been settled");
        _;
    }
    
    // The decided settlementamount is paid to the customer by the Insurance Company
    function DisburseClaimamount(int _claimId, address payable _customerWalletAddress, int _policyId) payable onlyTiedInsuraceCompany(_claimId) public
    {
        uint check = getPosition(_customerWalletAddress, _policyId);
        require(check != 100, "Not yet Applied for policy");
        require(msg.value == (customerData[_customerWalletAddress].suminsuredbypolicy[check]*70)/100, "Please add 70% of the remaining premium sum amount");
        if(claims[_claimId].amount < customerData[_customerWalletAddress].suminsuredbypolicy[check]){
            _customerWalletAddress.transfer(claims[_claimId].amount);
        }
        else {
            _customerWalletAddress.transfer(customerData[_customerWalletAddress].suminsuredbypolicy[check]);
        }
        customerData[_customerWalletAddress].claimSettled[check]=true;
        customerData[_customerWalletAddress].appliedForClaim=false;
        claims[_claimId].claimSettled=true;
    }

    function getPolicyArray() public view returns(int[] memory)
    { 
        return AllPolicyID;
    }
    
    function getCustomerAddress() public view returns(address[] memory)
    {
        return AllCustomers;
    }

    function balanceby(address wallet) external view returns(uint){
        return wallet.balance;
    }
} 