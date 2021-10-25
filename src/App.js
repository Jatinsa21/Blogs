import "./App.css";
import Login from "./componets/Login/Login";
import Registration from "./componets/Registraion/Registraion";
import { Home } from "./pages/Home/Home";
import { Route, Switch, Redirect } from "react-router-dom";
import Forgot from "./componets/ForgotPassword/Forgot";
import Main from "./pages/Main/Main";
import NoMatch from "./componets/noPage/NoMatch";
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
            <NoMatch/>
          </Route>
      </Switch>
    </>
  );
}

export default App;
