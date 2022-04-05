import React, { createContext, useReducer } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/Home';
import Landing from './components/landing';
import weatherforecast from './components/weather';
import { initialState, reducer } from './reducer';

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return(
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
      >
        <Router>
          <Switch>
            <Route path="/landing" component={Landing}/>
            <Route exact path="/" component={Home}/>
            <Route path="/weatherforecast" component={weatherforecast} />
          </Switch>
        </Router>
      </AuthContext.Provider>
  )
}

export default App;