import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import HealthCare from "./HealthCare";
import web3 from "./web3";
import "./RegisterPatient.css";

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      username: "",
      password: "",
      walletAddress: "",
      message: "",
    };
  }

  async handleClick(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    await HealthCare.methods
      .addInsuranceCompany(this.state.username,this.state.walletAddress,this.state.password)
      .send({ from: accounts[0], gas: 3300000 });

    this.setState({ message: "Insurance Company Added" });
    console.log("Here",this.state);

  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleWalletChange = (event) => {
    this.setState({ walletAddress: event.target.value });
  };

  render() {
    return (
      <Container className="my-5">
        <h1 className="text-center mb-5">Add Insurance Company</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Group controlId="formBasicUsername">
            <Form.Label className="input-label">Insurance Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              className="login-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="input-label">Insurance Company Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              className="login-input"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="input-label">Insurance Company Wallet Address</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter wallet address"
              value={this.state.walletAddress}
              onChange={this.handleWalletChange}
              className="login-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button" onClick={this.handleClick} >
            Add Insurance Company
          </Button>
          {this.state.message && (
              <p className="alert alert-success fade in">{this.state.message}</p>
            )}
        </Form>
      </Container>
    );
  }
}

export default Owner;
