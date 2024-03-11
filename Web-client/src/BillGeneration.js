import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import HealthCare from "./HealthCare";
import web3 from "./web3";
import "./RegisterPatient.css";

class BillGenerate extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      walletAddress: "",
      amount: "",
      description: "",
      message: "",
    };
  }

  async handleClick(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await HealthCare.methods
      .generatebBillforpatient(this.state.walletAddress,this.state.amount,this.state.description)
      .send({ from: accounts[0], gas: 3300000 });

    this.setState({ message: "Patient Bill Generated" });
    console.log("Here",this.state);

  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handleWalletChange = (event) => {
    this.setState({ walletAddress: event.target.value });
  };

  render() {
    return (
      <Container className="my-5">
        <h1 className="text-center mb-5">Generate Patient Bill</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="input-label">Patient Wallet Address</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Patient wallet address"
              value={this.state.walletAddress}
              onChange={this.handleWalletChange}
              className="login-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label className="input-label">Medical Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
              className="login-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="input-label">Service Charges (in wei)</Form.Label>
            <Form.Control
              type="number"
              value={this.state.amount}
              onChange={this.handleAmountChange}
              className="login-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button" onClick={this.handleClick} >
            Generate Bill
          </Button>
          {this.state.message && (
              <p className="alert alert-success fade in">{this.state.message}</p>
            )}
        </Form>
      </Container>
    );
  }
}

export default BillGenerate;
