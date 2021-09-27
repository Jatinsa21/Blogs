
import './App.css';
import Login from './componets/Login';
import Registration from './componets/Registraion';
import Header from './componets/Header/Header';
import { Home } from './pages/Home';
import {Route,Switch} from "react-router-dom"
import MainPage from './componets/Main/MainPage';
function App() {
  return (<>
      
    <Switch>

    
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/registration" component={Registration}/>
      <Route exact path="/main" component={MainPage}/>

    </Switch>
    </>
  );
}

export default App;
