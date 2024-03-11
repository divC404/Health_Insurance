import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import HealthCare from "./HealthCare";
import web3 from "./web3";

class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        name: "",
        walletAddress: "",
        policyId: "",
        premiumdue: "",
        suminsuredbypolicy: "",
        appliedForClaim: "",
        balance: "",
        billId: "",
        verifiedUser: "",
        claimSettled: ""
      },
      policies: [],
      policyID: 0,
      showPopup: false,
      policyApplied: {
        id: "",
        name: "",
        premium: "",
        sumInsured: "",
      }
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();

    // Policy update
    const policyArray = await HealthCare.methods.getPolicyArray().call();

    await policyArray.map(async (policy) => {
      const pol = await HealthCare.methods.policiesAvailable(policy).call();
      const poll = {
        id: pol.policyId,
        name: pol.policyName,
        premium: pol.premiumtobepaid,
        sumInsured: pol.suminsuredbypolicy,
      };
      this.setState({ policies: [...this.state.policies, poll] });

      // Customer update
    const bal = await HealthCare.methods.balanceby(accounts[0]).call();
    const custDetails = await HealthCare.methods.customerData(accounts[0]).call();
    const cust = {
      name: custDetails.customerName,
      walletAddress: custDetails.customerWalletAddress,
      policyId: custDetails.policyId,
      // premiumdue: custDetails,
      suminsuredbypolicy: custDetails.suminsuredbypolicy,
      appliedForClaim: custDetails.appliedForClaim,
      balance: bal,
      billId: custDetails.billId,
      verifiedUser: custDetails.verifiedUser,
      claimSettled: custDetails.claimSettled
    }
    let poller={};
    for (var i = 0; i < this.state.policies.length; i++) {
      
      if (this.state.policies[i].id === custDetails.policyId) {
        console.log("Hello if");
        if (this.state.customer.claimSettled == true){
          cust.premiumdue = 0;
        }
        else{
          cust.premiumdue = this.state.policies[i].premium;
        }
          poller.id = this.state.policies[i].id;
          poller.name = this.state.policies[i].name;
          poller.premium = this.state.policies[i].premium;
          poller.sumInsured = this.state.policies[i].sumInsured;
        console.log("poller",poller);
      }
    }
    console.log("Customer: ",this.state.customer);
    this.setState( { customer : cust } );
    this.setState( { policyApplied : poller } );
    console.log( "Policy: ",this.state.policyApplied );
    });
  }

  buttonstyle = {
    margin: "1%",
  };
  handlePolicyIdChange = (event) => {
    this.setState({ policyID: event.target.value });
  };

  handleApplyButtonClick = async () => {
    // applyforinsurance(policyID)
    // Here you can add your code to apply for the policy
    // For now, just show the success popup
    // this.setState({ showPopup: true });
    const accounts = await web3.eth.getAccounts();
    await HealthCare.methods.applyforinsurance(this.state.policyID)
    .send({ from: accounts[0], gas: 3300000 });
    
  };
  handlePayPremiumClick = async () => {
    // Pay premium for selectedInsurance
    const accounts = await web3.eth.getAccounts();
    await HealthCare.methods.paypremium()
    .send({ from: accounts[0], value: this.state.customer.premiumdue });
  };

  handleApplyClaimClick = async () => {
    // Apply for claim for selectedInsurance
    const accounts = await web3.eth.getAccounts();
    await HealthCare.methods.applyforclaim(this.state.customer.walletAddress,this.state.customer.policyId,this.state.customer.billId)
    .send({ from: accounts[0], gas: 3300000 });
  };

  handleClosePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h3>{this.state.customer.name}</h3>
            <p>Wallet Address: {this.state.customer.walletAddress}</p>
            <p>Wallet Balance: {this.state.customer.balance}</p>
            <p>Premium Due: {this.state.customer.premiumdue}</p>
            <p>Has Applied for claim: {this.state.customer.appliedForClaim ? "Yes" : "No"}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <center>
              <h3>Available Policies</h3>
            </center>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Policy ID</th>
                  <th>Name</th>
                  <th>Premium</th>
                  <th>Sum Insured</th>
                </tr>
              </thead>
              <tbody>
                {this.state.policies.map((policy) => (
                  <tr key={policy.id}>
                    <td>{policy.id}</td>
                    <td>{policy.name}</td>
                    <td>{policy.premium}</td>
                    <td>{policy.sumInsured}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <div>
          <h3>Apply for Insurance</h3>
          <Form>
            <Form.Group controlId="formBasicPolicyId">
              <Form.Label>Policy ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Policy ID"
                value={this.state.policyID}
                onChange={this.handlePolicyIdChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={this.handleApplyButtonClick}>
              Apply
            </Button>
          </Form>
          <Modal show={this.state.showPopup} onHide={this.handleClosePopup}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You have successfully applied for the policy with ID:{" "}
              {this.state.policyId}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClosePopup}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* Applied insurance */}
        
        { this.state.customer.verifiedUser==true && this.state.customer.claimSettled==false  &&  
        <div>
          <h2>Applied Insurances</h2>
          <div>
            <h3>{this.state.policyApplied.name}</h3>
            <p>Policy Id: {this.state.policyApplied.id}</p>
            <p>Insurance amount: {this.state.policyApplied.sumInsured}</p>
            <p>Payable amount:{this.state.policyApplied.premium}</p>
            {/* <div className="d-flex"> */}
            <Button
              style={this.buttonstyle}
              className="mr-2"
              variant="primary"
              onClick={() => this.handlePayPremiumClick(this.state.id)}
            >
              Pay Premium
            </Button>
            <Button
              style={this.buttonstyle}
              variant="primary"
              className="mr-2"
              onClick={() => this.handleApplyClaimClick(this.state.id)}
            >
              Apply for Claim
            </Button>
          </div>
          //{" "}
        </div>
        }
      </Container>
    );
  }
}

export default Patient;
