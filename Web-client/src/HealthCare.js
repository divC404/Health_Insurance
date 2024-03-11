import web3 from './web3';

const address = "0xD6DEd1A45BD77E3660D3C0AF3F85916D8b9fff64";

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "UserAddress",
				"type": "address"
			}
		],
		"name": "AddressExist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AllAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AllCustomers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AllPolicyID",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_customerWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_CustomerPassword",
				"type": "string"
			}
		],
		"name": "CustomerLogin",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "_claimId",
				"type": "int256"
			},
			{
				"internalType": "address payable",
				"name": "_customerWalletAddress",
				"type": "address"
			}
		],
		"name": "DisburseClaimamount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_hospitalWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_hospitalPassword",
				"type": "string"
			}
		],
		"name": "HospitalLogin",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_insuranceCompanyWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_insuranceCompanyPassword",
				"type": "string"
			}
		],
		"name": "InsuranceCompanyLogin",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_PatientAddress",
				"type": "address"
			}
		],
		"name": "VerifyPatient",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nameofInsuranceCompany",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_insuranceCompanyWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_insuranceCompanyPassword",
				"type": "string"
			}
		],
		"name": "addInsuranceCompany",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_policyName",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_policyId",
				"type": "int256"
			},
			{
				"internalType": "address payable",
				"name": "_insuranceCompanyWalletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_premiumtobepaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_suminsuredbypolicy",
				"type": "uint256"
			}
		],
		"name": "addnewpolicy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_customerWalletAddress",
				"type": "address"
			},
			{
				"internalType": "int256",
				"name": "_policyId",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_billId",
				"type": "int256"
			}
		],
		"name": "applyforclaim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "policyId",
				"type": "int256"
			}
		],
		"name": "applyforinsurance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "balanceby",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"name": "billmapping",
		"outputs": [
			{
				"internalType": "int256",
				"name": "billId",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "patientAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_hospitalwalletaddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"name": "claims",
		"outputs": [
			{
				"internalType": "bool",
				"name": "exists",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "claimId",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "billId",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "claimApproved",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "claimSettled",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "customerWalletAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "insuranceCompanyAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "claimsByInsranceCompany",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "customerData",
		"outputs": [
			{
				"internalType": "bool",
				"name": "alreadyexits",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "customerName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "customerWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "CustomerPassword",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "policyId",
				"type": "int256"
			},
			{
				"internalType": "bool",
				"name": "paidpremium",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "suminsuredbypolicy",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "appliedForClaim",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "billId",
				"type": "int256"
			},
			{
				"internalType": "bool",
				"name": "claimSettled",
				"type": "bool"
			},
			{
				"internalType": "int256",
				"name": "claimId",
				"type": "int256"
			},
			{
				"internalType": "bool",
				"name": "verifiedUser",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "generatebBillforpatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_companyAddress",
				"type": "address"
			}
		],
		"name": "getClaimsByCompany",
		"outputs": [
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCustomerAddress",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_customerWalletAddress",
				"type": "address"
			}
		],
		"name": "getCustomerDetails",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPolicyArray",
		"outputs": [
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hospitalmapping",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isalreadyexisting",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "hospitalName",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "hospitalregnum",
				"type": "int256"
			},
			{
				"internalType": "address",
				"name": "hospitalWalletAddress",
				"type": "address"
			},
			{
				"internalType": "int256",
				"name": "numverifications",
				"type": "int256"
			},
			{
				"internalType": "string",
				"name": "hospitalPassword",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "insuranceCompaniesmapping",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isalreadyexisting",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "insuranceCompanyName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "insuranceCompanyWalletAddress",
				"type": "address"
			},
			{
				"internalType": "int256",
				"name": "insuranceCompanyAccountBalance",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "insuranceCompanyregnum",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "insuranceCompanyPassword",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paypremium",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"name": "policiesAvailable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "alreadyexits",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "policyName",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "policyId",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "insuranceCompanyregnum",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "insuranceCompanyName",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "insuranceCompanyAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "premiumtobepaid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "suminsuredbypolicy",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_customerName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_customerWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_CustomerPassword",
				"type": "string"
			}
		],
		"name": "registerasacustomer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hospitalName",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_hospitalregnum",
				"type": "int256"
			},
			{
				"internalType": "address",
				"name": "_hospitalWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_hospitalPassword",
				"type": "string"
			}
		],
		"name": "registerhospital",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "verifiedhospitals",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_hospitaladdress",
				"type": "address"
			}
		],
		"name": "verifyhospital",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);


