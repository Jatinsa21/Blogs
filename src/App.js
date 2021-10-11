
import './App.css';
import Login from './componets/Login';
import Registration from './componets/Registraion';
import { Home } from './pages/Home';
import {Route,Switch} from "react-router-dom"
import MainPage from './componets/Main/MainPage';
import Forgot from './componets/ForgotPassword/Forgot';
function App() {
  return (<>
      
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/registration" component={Registration}/>
      <Route exact path="/main" component={MainPage}/>
      <Route exact path="/forgot" component={Forgot}/>
    </Switch>
    </>
  );
}

export default App;
