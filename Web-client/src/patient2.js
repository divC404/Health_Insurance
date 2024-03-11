import React, { Component } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import HealthCare from "./HealthCare";
import web3 from "./web3";

class Patient2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        name: "",
        policyId: "",
        premiumdue: "",
        suminsuredbypolicy: "",
        appliedForClaim: "",
        balance: "",
      },
      policies: [],
    };
  }
  buttonstyle = {
    margin: "10px",
  };

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

  render() {
    return (
      <div className="container mt-5">
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

export default Patient2;
