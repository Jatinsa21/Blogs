
import './App.css';
import Login from './componets/Login';
import Registration from './componets/Registraion';
import { Home } from './pages/Home';

import {Route,Switch} from "react-router-dom"
import Forgot from './componets/ForgotPassword/Forgot';
import Main from './pages/Main/Main';
function App() {
  return (<>
      
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/registration" component={Registration}/>
      <Route exact path="/forgot" component={Forgot}/>
      <Route exact path="/main" component={Main}/>

    </Switch>
    </>
  );
}

export default App;
