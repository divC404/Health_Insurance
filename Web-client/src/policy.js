import React, { Component } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import HealthCare from "./HealthCare";
import web3 from "./web3";

class Policy extends Component {
  constructor(props) {
    super(props);
    this.handlePolicyClick = this.handlePolicyClick.bind(this);
    this.state = {
      policyId: "",
      policyName: "",
      premium: "",
      sumInsured: "",
      policies: [],
    };
  }

  async componentDidMount() {
    const policyArray = await HealthCare.methods.getPolicyArray().call();
    const accounts = await web3.eth.getAccounts();

    await policyArray.map(async (policy) => {
      const pol = await HealthCare.methods.policiesAvailable(policy).call();
      if (pol.insuranceCompanyAddress === accounts[0]) {
        const poll = {
          id: pol.policyId,
          name: pol.policyName,
          premium: pol.premiumtobepaid,
          sumInsured: pol.suminsuredbypolicy,
        };
        this.setState({ policies: [...this.state.policies, poll] });
      }
    });
  }

  buttonstyle = {
    margin: "10px",
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  // handler for form submit button
  handlePolicyClick = async (event) => {
    event.preventDefault(); // prevent page reload on form submission
    const accounts = await web3.eth.getAccounts();
    await HealthCare.methods
      .addnewpolicy(
        this.state.policyName,
        this.state.policyId,
        accounts[0],
        this.state.premium,
        this.state.sumInsured
      )
      .send({ from: accounts[0], gas: 3600000 });

    const poll = {
      id: this.state.policyId,
      name: this.state.policyName,
      premium:  this.state.premium,
      sumInsured: this.state.sumInsured,
    };
    this.setState({ policies: [...this.state.policies, poll] });
    this.setState({
      policyId: "",
      policyName: "",
      premium: "",
      sumInsured: "",
    });
  };

  //   new data addded

  render() {
    return (
      <div className="container mt-5">
        <div className="container">
          <h1>Policy Form</h1>
          <form onSubmit={this.handlePolicyClick}>
            <div className="form-group">
              <label htmlFor="policyId">Policy ID:</label>
              <input
                type="number"
                className="form-control"
                id="policyId"
                name="policyId"
                value={this.state.policyId}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="policyName">Policy Name:</label>
              <input
                type="text"
                className="form-control"
                id="policyName"
                name="policyName"
                value={this.state.policyName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="premium">Premium to be Paid:</label>
              <input
                type="number"
                className="form-control"
                id="premium"
                name="premium"
                value={this.state.premium}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sumInsured">Sum Insured:</label>
              <input
                type="number"
                className="form-control"
                id="sumInsured"
                name="sumInsured"
                value={this.state.sumInsured}
                onChange={this.handleInputChange}
              />
            </div>
            <center>
              {" "}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </center>
          </form>
        </div>

        {/* List of the policies */}
        <h3>List of all the policies</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Name</th>
              <th>Premium</th>
              <th>sumInsured</th>
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
      </div>
    );
  }
}

export default Policy;
