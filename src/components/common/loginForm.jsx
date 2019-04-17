import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import styled from "styled-components";

import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as userAction from "../../actions/userAction";

const FormDiv = styled.div`
  background: #f5f6f7;
  display: flex;
  width: 100%;

  & .form {
    border-radius: 15px;
    padding: 25px;
    width: 400px;
    box-shadow: 0 10px 21px #e7eeef;
    height: 230px;
    margin: auto;
    background: #fff;
  }

  & button {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    await this.props.login(this.state.data);

    const error = this.props.error;

    if (!error) {
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } else if (error.response && error.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = error.response.data;
      this.setState({ errors });
      this.props.resetUserError();
    }
  };

  render() {
    if (this.props.user) return <Redirect to="/" />;
    return (
      <FormDiv>
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput(
              "username",
              null,
              "text",
              <i class="fa fa-user" />,
              "username"
            )}
            {this.renderInput(
              "password",
              null,
              "password",
              <i class="fa fa-lock" />,
              "password"
            )}
            {this.renderButton("Login")}
          </form>
          <div>
            Or wanna <NavLink to="/register">Register</NavLink>?
          </div>
        </div>
      </FormDiv>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userInfo.user,
  error: state.userInfo.error
});

const mapDispatchToProps = dispatch => ({
  login: async user => await dispatch(userAction.loginUser(user)),
  resetUserError: () => dispatch(userAction.resetUserError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
