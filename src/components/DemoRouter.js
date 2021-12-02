import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";
import CrudDemo from "./CrudDemo";
import Details from "./CrudDemo";
import Edit from "./Edit";

const DemoRouter = () => {
  const Welcome = () => {
    return (
      <div>
        <h1>Welcome</h1>
      </div>
    );
  };

  const Home = () => {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  };

  const About = () => {
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  };

  const Person = () => {
    return (
      <div>
        <h1>Person</h1>
      </div>
    );
  };

  const NotFound = () => {
    return (
      <div>
        <h1>Page not found.</h1>
      </div>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <PageWrapper>
            <Route component={Welcome} path="/" exact />
            <Route component={Home} path="/home" />
            <Route component={Person} path="/person" />
            <Route component={About} path="/about" />
            <Route component={CrudDemo} path="/crud" />
            <Route component={Details} path="/details/:id" />
            <Route component={Edit} path="/edit/:id" />
            <Route component={NotFound} path="/404" />
          </PageWrapper>
        </Switch>
      </BrowserRouter>
    </>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
`;

export default DemoRouter;
