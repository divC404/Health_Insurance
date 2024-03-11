import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import ReactDOM from "react-dom";
import HealthCare from "./HealthCare";
import web3 from "./web3";
import { Button, Modal, Table } from "react-bootstrap";
export default class Hadmin extends React.Component {
  constructor(props) {
    super(props);
    this.handleHospitalClick = this.handleHospitalClick.bind(this);
    this.state = {
      customers: [],
      claims: [],
      hospitalWallet: "",
      claimIds : [],
    };
  }

  // nt claimId;
  //       int billId;
  //       uint amount;
  //       string description;
  //       bool claimApproved;
  //       bool claimSettled;
  //       // uint settlementamount;
  //       address customerWalletAddress;
  //       address insuranceCompanyAddress;
  //getClaimsByCompany => getPolicyArray
  //claims => policiesAvailable
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);

    // simple

    const balll = await HealthCare.methods.balanceby(accounts[0]).call();
    console.log("Output:", balll);
    // get all claims
    // const claimArray = await HealthCare.methods
    //   .getClaimsByCompany(accounts[0])
    //   .call();

    // console.log( "1", "claimArray" );

    // await claimArray.map(async (claim) => {
    //   const cla = await HealthCare.methods.claims(claim).call();
    //   console.log( "2", cla );

    //   if (cla.claimApproved === false) {
    //     const claa = {
    //       id: cla.claimId,
    //       bill: cla.billId,
    //       price: cla.amount,
    //       description: cla.description,
    //       customerWalletAddress: cla.customerWalletAddress
    //     };
    //     this.setState({ claims: [...this.state.claims, claa] });
    //   }
    // });

    // get all customers
    //     getCustomerAddress
    // getCustomerDetails
    const customerArray = await HealthCare.methods.getCustomerAddress().call();

    await customerArray.map(async (customer) => {
      const cust = await HealthCare.methods.customerData(customer).call();
      console.log("cust",cust);
      // claim idea
      if( cust.claimId != 0 ){
        this.setState({ claimIds: [...this.state.claimIds, cust.claimId] });
      }
      if(cust.verifiedUser===false)
      {
      const cust2 = {
        name: cust.customerName,
        walletAddress: cust.customerWalletAddress,
        policyId: cust.policyId,
        suminsuredbypolicy: cust.suminsuredbypolicy,
      };
      this.setState({ customers: [...this.state.customers, cust2] });
    }
    });

     setTimeout( () => {
       this.state.claimIds.map(async (claim) => {
        console.log("ccc",claim);
        const cla = await HealthCare.methods.claims(claim).call();
        console.log("2", cla);
  
        if (cla.claimApproved === false) {
          const claa = {
            id: cla.claimId,
            bill: cla.billId,
            price: cla.amount,
            description: cla.description,
            customerWalletAddress: cla.customerWalletAddress
          };
          this.setState({ claims: [...this.state.claims, claa] });
        }
      });
    },1000)

    console.log("claim ids final ",this.state.claimIds);

     


  }

  async handleHospitalClick(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log("acc", accounts);
    console.log("--", this.state.hospitalWallet);
    await HealthCare.methods
      .verifyhospital(this.state.hospitalWallet)
      .send({ from: accounts[0], gas: 3600000 });
  }

  buttonstyle = {
    margin: "1%",
  };

  addPolicy = () => {
    console.log("hello");

    this.props.history.push("/policy");
  };

  approveCustomer = async (index) => {
    const accounts = await web3.eth.getAccounts();
    const customers = [...this.state.customers];
    console.log(customers);
    console.log("ind",index);
    console.log("gas price", (customers[index].suminsuredbypolicy * 30) / 100);
    await HealthCare.methods
      .VerifyPatient(customers[index].walletAddress)
      .send({
        from: accounts[0],
        value: (customers[index].suminsuredbypolicy * 30) / 100,
      });
    customers.splice(index, 1);
    this.setState({ customers });
  };

  approveClaim = async (index) => {
    const accounts = await web3.eth.getAccounts();
    const claims = [...this.state.claims];
    console.log("In approve",claims);
    const cust = await HealthCare.methods
      .customerData(claims[index].customerWalletAddress)
      .call();
    console.log(
      "gas price",
      ((claims[index].id, cust.suminsuredbypolicy) * 70) / 100
    );
    console.log("cusssuuu",cust);
    console.log("--",claims[index].id);
    console.log("++",cust.customerWalletAddress);
    await HealthCare.methods
      .DisburseClaimamount(claims[index].id, cust.customerWalletAddress)
      .send({ from: accounts[0], value: (cust.suminsuredbypolicy * 70) / 100 });
    claims.splice(index, 1);
    this.setState({ claims });
  };
  handleHospitalChange = (event) => {
    this.setState({ hospitalWallet: event.target.value });
  };

  buttonstyle = { position: "absolute", top: "10%", right: "10px" };
  render() {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-end mb-3">
          <center>
            {" "}
            <h3>Customer Verification</h3>
          </center>
          <div md-6>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Wallet Address</th>
                  <th>Policy Id</th>
                  <th>Sum insured by policy</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.walletAddress}</td>
                    <td>{customer.policyId}</td>
                    <td>{customer.suminsuredbypolicy}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => this.approveCustomer(index)}
                      >
                        Approve
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <h3>Hospital Verifcation</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Hospital address"
          value={this.state.hospitalWallet}
          onChange={this.handleHospitalChange}
        />{" "}
        <center>
          {" "}
          <Button variant="primary" onClick={this.handleHospitalClick}>
            Verify
          </Button>
        </center>
        <center>
          {" "}
          <h3>Claim Verification</h3>
        </center>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Claim ID</th>
              <th>Bill</th>
              <th>Price</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.claims.map((claim, index) => (
              <tr key={index}>
                <td>{claim.id}</td>
                <td>{claim.bill}</td>
                <td>{claim.price}</td>
                <td>{claim.description}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => this.approveClaim(index)}
                  >
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          {" "}
          <center>
            {" "}
            <Button variant="info" size="l" onClick={() => this.addPolicy()}>
              {" "}
              Add Policy
            </Button>{" "}
          </center>
        </div>
      </div>
    );
  }
}
