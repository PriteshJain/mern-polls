import React from 'react';
import './index.css';
import Poll from "./components/poll";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import CreatePoll from './components/createPoll';

const initPoll = {
  title: "Will this demo work?",
  choices: [
    { name: "YESSSS", votes: 0, classes: ['choice'] },
    { name: "NAAHHH", votes: 0, classes: ['choice'] }
  ]
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="appHeader">
          <nav className="nav">
            <ul>
              <li className="nav-links">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create Poll</Link>
              </li>
            </ul>
          </nav>
        <div className="appBody">
          <Switch>            
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/create">
              <CreatePoll />
            </Route>            
            <Route path="/polls/:id" >
              <Poll poll={initPoll} />
            </Route>
          </Switch>
        </div>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      Home
    </div>
  );
}
export default App;
