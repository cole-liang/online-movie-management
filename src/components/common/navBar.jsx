import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Icon, Button } from "antd";
import styled from "styled-components";

const Nav = styled.div`
  left: 0;
  height: 100%;
  width: 100%;

  & .menu {
    height: 93%;
  }

  /*NavLink*/
  & .menu a {
    text-decoration: none;
  }

  & .menu > li:first-child {
    margin: 45px 0px 20px;
  }

  & .btn-collapsed {
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
    margin-right: 15px;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    background-size: cover;
    background-image: url("https://png2.kisspng.com/sh/70f1275584cbdfce373fad980a284db5/L0KzQYm3WcIxN6pngJH0aYP2gLBuTfNwdaF6jNd7LXnmf7B6TgBweqVmet5uLX7ohMj2kvsub6NmiNpyY4OwccfolPFzNZpoRadrYUPmRofsU8A3amI6RqICNUa1R4KAUcU0P2U6Uao7MkG8SIS1kP5o/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66e306b15.0756271715374598221983.png");
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
      collapsedWidthLg
    } = this.props;

    return (
      <Nav
        isCollapsed={isCollapsed}
        collapsedWidthSm={collapsedWidthSm}
        collapsedWidthLg={collapsedWidthLg}
      >
        <Menu
          className="menu"
          mode="inline"
          theme="dark"
          inlineCollapsed={isCollapsed}
        >
          {!user && (
            <Menu.Item key="1">
              <NavLink to="/login">
                <Icon type="user" />
                <span className="login">User Login</span>
              </NavLink>
            </Menu.Item>
          )}
          {user && (
            <SubMenu
              key="sub1"
              title={
                <span className="userInfo">
                  {isCollapsed && <Icon type="user" />}
                  {!isCollapsed && (
                    <React.Fragment>
                      <div className="avatar" />
                      <span className="username">{user.name}</span>
                    </React.Fragment>
                  )}
                </span>
              }
            >
              <Menu.Item key="account">
                <NavLink to="/">
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
          <Menu.Item key="2">
            <NavLink to="/movies">
              <Icon type="desktop" />
              <span>Movies</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="area-chart" />
            <span>Analytics</span>
          </Menu.Item>
          {/* <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="mail" />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="appstore" />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
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

// const NavBar = ({ user }) => {
//   return (
//     <ul>
//       {user && (
//         <div>
//           <li>{user.username}</li>
//           <li>Logout</li>
//         </div>
//       )}
//       {!user && (
//         <div>
//           <li>Login</li>
//         </div>
//       )}
//       <li>
//         <NavLink to="/movies">Movies</NavLink>
//       </li>
//     </ul>
// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <Link className="navbar-brand" to="/">
//     Vidly
//   </Link>
//   <button
//     className="navbar-toggler"
//     type="button"
//     data-toggle="collapse"
//     data-target="#navbarNavAltMarkup"
//     aria-controls="navbarSupportedContent"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <span className="navbar-toggler-icon" />
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//     <div className="navbar-nav">
//       <NavLink className="nav-item nav-link" to="/movies">
//         Movies
//       </NavLink>
//       <NavLink className="nav-item nav-link" to="/customers">
//         Customers
//       </NavLink>
//       <NavLink className="nav-item nav-link" to="/rentals">
//         Rentals
//       </NavLink>
//       {!user && (
//         <React.Fragment>
//           <NavLink className="nav-item nav-link" to="/login">
//             Login
//           </NavLink>
//           <NavLink className="nav-item nav-link" to="/register">
//             Register
//           </NavLink>
//         </React.Fragment>
//       )}
//       {user && (
//         <React.Fragment>
//           <NavLink className="nav-item nav-link" to="/profile">
//             {user.name}
//           </NavLink>
//           <NavLink className="nav-item nav-link" to="/logout">
//             Logout
//           </NavLink>
//         </React.Fragment>
//       )}
//     </div>
//   </div>
// </nav>
//   );
// };

// export default NavBar;
