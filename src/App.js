import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/common/header";
import Footer from "./components/common/footer";
import NavBar from "./components/common/navBar";
import AppRouter from "./routers/appRouter";

import styled from "styled-components";
import * as userActions from "./actions/userAction";
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

  & .horizontalMenu {
    display: none;
  }

  @media only screen and (max-width: 768px) {
    & .navDiv {
      display: none;
    }

    & .horizontalMenu {
      display: block;
    }

    & .displayWeb {
      margin-left: 0;
    }
  }
`;

const appTitle = "Colima";

const footerContent = (
  <React.Fragment>
    <i class="fa fa-copyright" /> Copyright LWX(Cole) 2019
  </React.Fragment>
);

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.loadUser();
    this.setState({ isCollapsed: false });
  }

  handleCollapsed = isCollapsed => {
    this.setState({ isCollapsed });
  };

  render() {
    const { isCollapsed } = this.state;
    return (
      <Container isCollapsed={isCollapsed}>
        <div className="navDiv">
          <ToastContainer />
          <NavBar
            mode="inline"
            isCollapsed={isCollapsed}
            onCollapsed={this.handleCollapsed}
            collapsedWidthSm={collapsedWidthSm}
            collapsedWidthLg={collapsedWidthLg}
          />
        </div>
        <div class="displayWeb">
          <Header title={appTitle} />
          <div class="horizontalMenu">
            <NavBar mode="horizontal" title={appTitle} />
          </div>
          <AppRouter />
          <Footer content={footerContent} />
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(userActions.loadUser())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
