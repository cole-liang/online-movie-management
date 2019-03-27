import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import auth from "../../services/authService";
import styled from "styled-components";
import { Steps, Alert } from "antd";
import { register } from "../../services/userService";

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
    current: 0,
    seconds: 3,
    response: null
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
    try {
      const response = await register(this.state.data);
      this.setState({ response, current: 1 });
      this.countDown();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  countDown = () => {
    let timer = setInterval(() => {
      this.setState(
        preState => ({
          seconds: preState.seconds - 1
        }),
        () => {
          if (this.state.seconds == 0) {
            clearInterval(timer);
          }
        }
      );
    }, 1000);
  };

  pageRedirect = () => {
    const { response } = this.state;
    auth.loginWithJwt(response.headers["x-auth-token"]);
    window.location = "/";
  };

  render() {
    const { current, seconds } = this.state;
    if (seconds === 0) this.pageRedirect();
    return (
      <FormDiv>
        <Steps className="steps" current={current}>
          <Step key="register" title="Register" />
          <Step key="finished" title="Finished" />
        </Steps>
        {current === 0 && (
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name")}
            {this.renderButton("Register")}
          </form>
        )}
        {current === 1 && (
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

export default RegisterForm;
