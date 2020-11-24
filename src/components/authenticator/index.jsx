import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "../../pages/Login/";
import UserRegister from "../../pages/UserRegister/";
import Users from "../../pages/Restricted/Users/";
import UserFeedbacks from "../../pages/Restricted/UserFeedbacks/";
import FeedbackForm from "../../pages/Restricted/FeedbackForm/";

import axios from "axios";

const Authenticator = () => {
  const [authenticated, setAuthenticated] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (token === false) {
      setAuthenticated(false);
    }
    axios
      .get("https://ka-users-api.herokuapp.com/users", {
        headers: { Authorization: token },
      })
      .then(() => {
        setAuthenticated(true);
        // history.push("users");
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, [history, setAuthenticated]);

  if (authenticated === undefined) {
    return <div>Loading...</div>;
  }

  if (authenticated === false) {
    return (
      <Switch>
        <Route exact path="/">
          <Login setAuthenticated={setAuthenticated}></Login>
        </Route>
        <Route exact path="/register">
          <UserRegister></UserRegister>
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/logoff">
        <button>LogOff</button>
      </Route>
      <Route path="/users">
        <Users></Users>
      </Route>

      <Route path="/users/feedback/:id">
        <UserFeedbacks></UserFeedbacks>
      </Route>

      <Route path="/users/feedback/:id/new">
        <FeedbackForm></FeedbackForm>
      </Route>
    </Switch>
  );
};

export default Authenticator;
