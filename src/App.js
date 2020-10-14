import React from 'react';
import { Route } from 'react-router-dom';
import './style.css';
import Home from './components/Home';
import TeamRoster from './components/TeamRoster';


const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/teams/:teamId" component={TeamRoster}/>
    </div>
  ); 
}

export default App;
