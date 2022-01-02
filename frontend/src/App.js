import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from "./components/LandingPage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AskQuestion from "./components/AskQuestion";
import AnswerQuestion from "./components/AnswerQuestion";
import MyAskMeAnything from "./components/MyAskMeAnything";


function App () {

    //const [auth, setAuth] = useState(false)

    return(
        <Router>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/ask" component={AskQuestion}/>
                <Route exact path="/home" component={MyAskMeAnything}/>
                <Route exact path="/answer" component={AnswerQuestion}/>
            </Switch>
        </Router>

    )
}

export default App;
