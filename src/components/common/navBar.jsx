import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Icon, Button } from "antd";
import styled from "styled-components";

const Nav = styled.div`
  left: 0;
  height: 100%;
  width: 100%;

  & .menu {
    height: ${props => (props.mode === "inline" ? "93%" : "46px")};
  }

  /*NavLink*/
  & .menu a {
    text-decoration: none;
  }

  & .menu > li:first-child {
    margin: 45px 0px 20px;
  }

  & .menu > li:first-child .ant-menu-submenu-title {
    height: 50px;
  }

  & .menuBrand {
    font-size: 29px;
    font-weight: 600;
    font-family: "Comic Sans MS", cursive, sans-serif;
    color: white;
    margin-left: 15px;
  }

  & .menuIcon {
    float: ${props => (props.mode === "inline" ? "none" : "right")};
  }

  & .menuIcon i {
    margin-right: ${props => (props.mode === "inline" ? "10px" : "0px")};
    font-size: ${props => (props.mode === "inline" ? "inherit" : "25px")};
    position: ${props => (props.mode === "inline" ? "inherit" : "relative")};
    top: 5px;
  }

  & .menuIcon i + span {
    margin-left: ${props => (props.mode === "inline" ? "0px" : "10px")};
  }

  & .btn-collapsed {
    display: ${props => (props.mode === "inline" ? "inline-block" : "none")};
    outline: none;
    cursor: pointer;
    background: rgba(0, 21, 41, 0.85);
    border: none;
    height: 7%;
    bottom: 0;
    width: ${props =>
      props.isCollapsed ? props.collapsedWidthSm : props.collapsedWidthLg};
    transition: ${props =>
      "color 0.2s, " + (props.isCollapsed ? "width 0.15s" : "width 0.23s")};
    color: rgba(255, 255, 255, 0.65);
  }

  & .btn-collapsed:hover {
    color: #fff;
  }

  & .avatar {
    display: inline-block;
    margin-right: ${props => (props.mode === "inline" ? "10px" : "0px")};
    margin-top: ${props => (props.mode === "inline" ? "0px" : "5px")};
    height: ${props => (props.mode === "inline" ? "40px" : "35px")};
    width: ${props => (props.mode === "inline" ? "40px" : "35px")};
    border-radius: 100%;
    background-size: cover;
    background-image: url("https://ya-webdesign.com/images/avatar-icon-png-17.png");
  }

  & .userInfo {
    display: flex;
    justify-content: center;
  }

  & .username {
    font-size: 40px;
  }

  & .account,
  & .logout {
    position: relative;
    left: 48px;
  }
`;

const SubMenu = Menu.SubMenu;

class NavBar extends Component {
  toggleCollapsed = () => {
    this.props.onCollapsed(!this.props.isCollapsed);
  };

  render() {
    const {
      isCollapsed,
      user,
      collapsedWidthSm,
      collapsedWidthLg,
      mode,
      title
    } = this.props;

    return (
      <Nav
        mode={mode}
        isCollapsed={isCollapsed}
        collapsedWidthSm={collapsedWidthSm}
        collapsedWidthLg={collapsedWidthLg}
      >
        <Menu
          className="menu"
          mode={mode}
          theme="dark"
          inlineCollapsed={isCollapsed}
        >
          {title && <span className="menuBrand">{title}</span>}
          {!user && (
            <Menu.Item className="menuIcon" key="1">
              <NavLink to="/login">
                <Icon type="user" />
                <span className="login">User Login</span>
              </NavLink>
            </Menu.Item>
          )}
          {user && (
            <SubMenu
              className="menuIcon"
              key="sub1"
              title={
                <span className="userInfo">
                  {isCollapsed && <Icon type="user" />}
                  {!isCollapsed && (
                    <React.Fragment>
                      <div className="avatar" />
                      {mode === "inline" && (
                        <span className="username">{user.name}</span>
                      )}
                    </React.Fragment>
                  )}
                </span>
              }
            >
              <Menu.Item key="account">
                <NavLink to={`/accounts/${user._id}`}>
                  <span className="account">Account</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="logout">
                <NavLink to="/logout">
                  <span className="logout">Logout</span>
                </NavLink>
              </Menu.Item>
            </SubMenu>
          )}
          <Menu.Item className="menuIcon" key="2">
            <NavLink to="/movies">
              <Icon className="" type="desktop" />
              {mode === "inline" && <span>Movies</span>}
            </NavLink>
          </Menu.Item>
          <Menu.Item className="menuIcon" key="3">
            <NavLink to="/statistics">
              <Icon type="area-chart" />
              {mode === "inline" && <span>Statistics</span>}
            </NavLink>
          </Menu.Item>
        </Menu>
        <button
          isCollapsed={isCollapsed}
          className="btn-collapsed"
          onClick={this.toggleCollapsed}
        >
          <Icon type={isCollapsed ? "double-right" : "double-left"} />
        </button>
      </Nav>
    );
  }
}

export default NavBar;
