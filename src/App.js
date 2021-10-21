import "./App.css";
import Login from "./componets/Login";
import Registration from "./componets/Registraion";
import { Home } from "./pages/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import Forgot from "./componets/ForgotPassword/Forgot";
import Main from "./pages/Main/Main";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/forgot" component={Forgot} />
        <Route
          exact
          path="/home"
          render={(props) => {
            return JSON.parse(localStorage.getItem("key")) ? (
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
            return JSON.parse(localStorage.getItem("key")) ? (
              <Main />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
      </Switch>
    </>
  );
}

export default App;
