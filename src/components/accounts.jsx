import React, { Component } from "react";
import { connect } from "react-redux";

class Accounts extends Component {
  componentDidMount() {
    const userId = this.props.match.params.id;

    if (this.props.user._id !== userId)
      this.props.history.replace("/not-found");
  }

  render() {
    return <div>Coming soon...</div>;
  }
}

const mapStateToProps = state => ({
  user: state.userInfo.user
});

export default connect(
  mapStateToProps,
  null
)(Accounts);
