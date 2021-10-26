import "./App.css";
import Login from "./componets/Login/Login";
import Registration from "./componets/Registraion/Registraion";
import Home from "./pages/Home/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import Forgot from "./componets/ForgotPassword/Forgot";
import Main from "./pages/Main/Main";
import NoMatch from "./componets/noPage/NoMatch";
import client from "./utils/apolloClient";
import { ApolloProvider } from "@apollo/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/" component={Login} />
       
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/forgot" component={Forgot} />
        <Route
          exact
          path="/home"
          render={(props) => {
            return JSON.parse(localStorage.getItem("validating")) ? (
              <Home />
              
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          exact
          path="/main/:id"
          render={(props) => {
            return JSON.parse(localStorage.getItem("validating")) ? (
              <Main />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
