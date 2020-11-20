import "./App.css";

import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login/";
import UserRegister from "./pages/UserRegister/";

function App() {
  const [allowed, setAllowed] = useState(true);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        {allowed && (
          <Route path="/register">
            <UserRegister></UserRegister>
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
