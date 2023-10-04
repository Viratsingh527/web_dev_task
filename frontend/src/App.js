// import logo from './logo.svg';
import './App.css';

// import { Button } from "@chakra-ui/react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./page/homepage"
import Chatpage from "./page/chatpage";
function App() {
  return (
    <div className="App">
      <Switch><Route path='/' component={Homepage} exact />
        <Route path='/chats' component={Chatpage} /></Switch>


    </div>
  );
}

export default App;
