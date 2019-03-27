import React, { Component } from "react";
import auth from "../services/authService";

class Accounts extends Component {
  state = {};

  componentDidMount() {
    const userId = this.props.match.params.id;
    const user = auth.getCurrentUser();

    if (user._id !== userId) this.props.history.replace("/not-found");
  }

  render() {
    return <div>Coming soon...</div>;
  }
}

export default Accounts;
