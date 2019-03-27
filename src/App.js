import React, { Component } from "react";
import { Route, Redirect, Switch, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { Icon } from "antd";
import styled from "styled-components";
import Movies from "./components/movies";
import NavBar from "./components/common/navBar";
import Accounts from "./components/accounts";
import Statistics from "./components/statistics";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/common/registerForm";
import Logout from "./components/common/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const collapsedWidthSm = "80px";
const collapsedWidthLg = "250px";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  & .navDiv {
    height: 100%;
    position: fixed;
    width: ${props =>
      props.isCollapsed ? collapsedWidthSm : collapsedWidthLg};
    transition: width 0.2s;
  }

  & .displayWeb {
    display: flex;
    flex-direction: column;
    margin-left: ${props =>
      props.isCollapsed ? collapsedWidthSm : collapsedWidthLg};
    transition: 0.2s;
    min-height: 100vh;
  }

  & .content {
    display: flex;
    flex: 1;
  }

  & header {
    height: 60px;
    background: #fff;
    font-size: 35px;
    font-weight: 600;
    font-family: "Comic Sans MS", cursive, sans-serif;
    text-align: center;
    box-shadow: 0px 3px 5px #dcdcdc;
  }

  & header > a {
    color: #ffa500 !important;
    text-decoration: none;
  }

  & footer {
    background: #fff;
    color: #625471;
    border-top: 1px solid #e2dee6;
    text-align: center;
    padding: 15px 0;
  }
`;

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user, isCollapsed: false });
  }

  handleCollapsed = isCollapsed => {
    console.log(isCollapsed);
    this.setState({ isCollapsed });
  };

  render() {
    const { user, isCollapsed } = this.state;
    return (
      <Container isCollapsed={isCollapsed}>
        <div className="navDiv">
          <ToastContainer />
          <NavBar
            isCollapsed={isCollapsed}
            onCollapsed={this.handleCollapsed}
            collapsedWidthSm={collapsedWidthSm}
            collapsedWidthLg={collapsedWidthLg}
            user={user}
          />
        </div>
        <div class="displayWeb">
          <header>
            <NavLink to="/">
              <span>Colima</span>
            </NavLink>
          </header>
          <div className="content">
            <Switch>
              <ProtectedRoute path="/movies/:id" component={MovieForm} />
              <Route
                path="/movies"
                render={props => <Movies user={user} {...props} />}
              />
              <Route path="/accounts/:id" component={Accounts} />
              <Route path="/statistics" component={Statistics} />
              <Route path="/not-found" exact component={NotFound} />
              <Route path="/login" exact component={LoginForm} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/register" exact component={RegisterForm} />
              <Redirect from="/" exact to="/movies" component={Movies} />
              <Redirect to="/not-found" component={NotFound} />
            </Switch>
          </div>
          <footer>
            <span>
              <i class="fa fa-copyright" /> Copyright LWX(Cole) 2019
            </span>
          </footer>
        </div>
      </Container>
    );
  }
}

export default App;
