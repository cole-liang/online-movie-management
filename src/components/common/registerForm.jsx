import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import styled from "styled-components";

import { Steps, Alert } from "antd";
import { connect } from "react-redux";

import * as userAction from "../../actions/userAction";

const FormDiv = styled.div`
  margin: 50px auto;

  & .steps {
    width: 600px;
    height: 10%;
  }

  & form {
    margin: 40px auto;
    width: 450px;
    padding: 40px;
    border-radius: 30px;
    box-shadow: 2px 2px 5px #dcdcdc;
    border: 1px solid #00bfff;
  }

  & button {
    margin-top: 10px;
    width: 100%;
  }

  & .successDiv {
    display: flex;
    align-items: center;
    top: -20%;
    position: relative;
    height: 90%;
  }

  & .successMsg {
    width: 100%;
  }
`;

const Step = Steps.Step;

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {},
    currentStep: 0,
    seconds: 3
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .min(5)
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    await this.props.registerUser(this.state.data);

    const error = this.props.error;

    if (!error) {
      this.setState({ currentStep: 1 });
      this.countDown();
    } else if (error.response && error.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = error.response.data;
      this.setState({ errors });
      this.props.resetUserError();
    }
  };

  countDown = () => {
    let timer = setInterval(() => {
      this.setState(
        preState => ({
          seconds: preState.seconds - 1
        }),
        () => {
          if (this.state.seconds === 0) {
            clearInterval(timer);
          }
        }
      );
    }, 1000);
  };

  pageRedirect = () => {
    this.props.loginWithJwt(this.props.userJwt);
    window.location = "/";
  };

  render() {
    const { currentStep, seconds } = this.state;
    if (seconds === 0) this.pageRedirect();
    return (
      <FormDiv>
        <Steps className="steps" current={currentStep}>
          <Step key="register" title="Register" />
          <Step key="finished" title="Finished" />
        </Steps>
        {currentStep === 0 && (
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        )}
        {currentStep === 1 && (
          <div className="successDiv">
            <Alert
              className="successMsg"
              message="Success"
              description={`You will be redirected to the home page in ${seconds} seconds...`}
              type="success"
              showIcon
            />
          </div>
        )}
      </FormDiv>
    );
  }
}

const mapStateToProps = state => ({
  error: state.userInfo.error,
  userJwt: state.userInfo.jwt
});

const mapDispatchToProps = dispatch => ({
  registerUser: async user => await dispatch(userAction.registerUser(user)),
  loginWithJwt: jwt => dispatch(userAction.loginUserWithJwt(jwt)),
  resetUserError: () => dispatch(userAction.resetUserError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
