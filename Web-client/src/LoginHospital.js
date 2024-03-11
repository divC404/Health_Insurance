import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import HealthCare from "./HealthCare";
import web3 from "./web3";
import "./RegisterPatient.css";

class LoginHospital extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
    //   username: "",
      password: "",
      message: ""
    };
  }

  async handleClick(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log("Before",this.state);

    const abc = await HealthCare.methods
      .HospitalLogin(accounts[0],this.state.password).call();

    console.log(abc);
    if(abc==1){
      this.props.history.push("/generate-bill");
    }
    //   .send({ from: accounts[0], gas: 2100000 });
    // const abc = await HealthCare.methods._records(this.state.recID).call();
    // console.log("Changed health record",abc)
    console.log("Here",this.state);
    this.setState({ message: "Login failed!" });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`username: ${this.state.username}, password: ${this.state.password}`);
    // You can replace the above console.log with your desired login logic
  };

//   handleUsernameChange = (event) => {
//     this.setState({ username: event.target.value });
//   };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <Container className="my-5">
        <h1 className="text-center mb-5">Hospital Login</h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {/* <Form.Group controlId="formBasicUsername">
            <Form.Label className="input-label">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              className="login-input"
            />
          </Form.Group> */}

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="input-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              className="login-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button" onClick={this.handleClick} >
            Login
          </Button>
          {this.state.message && (
              <p className="alert alert-danger fade in">{this.state.message}</p>
            )}
        </Form>
      </Container>
    );
  }
}

export default LoginHospital;
