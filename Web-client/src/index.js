import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Redirect,Link } from "react-router-dom";
import Patient from './patient'
import Patient2 from './patient2'
import Insurance from './insurance'
import RegisterPatient from './RegisterPatient';
import LoginPatient from './LoginPatient';
import LoginHospital from './LoginHospital';
import Owner from './Owner';
import BillGenerate from './BillGeneration';
import RegisterHospital from './RegisterHospital';
import './index.css';
import Policy from './policy'
import LoginInsurance from './LoginInsurance';
// import HealthCare from './HealthCare'
const FullApp = () => (
  <Router>
    <div>
    <header className="App-header">
          <h1 className="App-title text-center">HealthCare Insurance</h1>
        </header>
      <Route exact path="/" component={App} />
      <Route path="/patient" component={Patient} />
      <Route path="/patient2" component={Patient2} />
      <Route path="/policy" component={Policy} />
      <Route path="/register-patient" component={RegisterPatient} />
      <Route path="/login-patient" component={LoginPatient} />
      <Route path="/insurance" component={Insurance} />
      <Route path="/owner" component={Owner} />
      <Route path="/generate-bill" component={BillGenerate} />
      <Route path="/register-hospital" component={RegisterHospital} />
      <Route path="/login-hospital" component={LoginHospital} />
      <Route path="/login-insurance" component={LoginInsurance} />


    </div>
  </Router>
);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      password:'',
      login:false
    }
  }
  render() {
    return (
      <div>
        <h3>Home page</h3>
      </div>
    );
  }
}

ReactDOM.render(<FullApp />, document.getElementById('root'));
