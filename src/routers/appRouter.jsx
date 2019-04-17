import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Movies from "../components/movies";
import Accounts from "../components/accounts";
import Statistics from "../components/statistics";
import NotFound from "../components/notFound";
import LoginForm from "../components/common/loginForm";
import Logout from "../components/common/logout";
import RegisterForm from "../components/common/registerForm";
import MovieForm from "../components/movieForm";
import ProtectedRoute from "../components/common/protectedRoute";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const AppRouter = () => {
  return (
    <Content>
      <Switch>
        <ProtectedRoute path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} />
        <Route path="/accounts/:id" component={Accounts} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/not-found" exact component={NotFound} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={RegisterForm} />
        <Redirect from="/" exact to="/movies" component={Movies} />
        <Redirect to="/not-found" component={NotFound} />
      </Switch>
    </Content>
  );
};

export default AppRouter;
