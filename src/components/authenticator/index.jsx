import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Login from "../../pages/Login/";
import UserRegister from "../../pages/UserRegister/";
import Users from "../../pages/Restricted/Users/";
import UserFeedbacks from "../../pages/Restricted/UserFeedbacks/";
import FeedbackForm from "../../pages/Restricted/FeedbackForm/";

import axios from "axios";

const Comp = () => {
  return <div>teste</div>;
};

const Authenticator = () => {
  const [authenticated, setAuthenticated] = useState(undefined);
  const [usersData, setUsersData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (!token) {
      setAuthenticated(false);
    }
    axios
      .get("https://ka-users-api.herokuapp.com/users", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setAuthenticated(true);
        setUsersData(res.data);
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
        <Route path="/register">
          <UserRegister></UserRegister>
        </Route>
      </Switch>
    );
  }
  console.log(authenticated);
  return (
    <Switch>
      <Route exact path="/">
        <p>Você já está logado.</p>
      </Route>
      <Route exact path="/users">
        <Users usersData={usersData} authenticated={authenticated}></Users>
      </Route>

      <Route exact path="/users/feedbacks/:id">
        <UserFeedbacks authenticated={authenticated}></UserFeedbacks>
      </Route>

      <Route exact path="/users/feedback/:id/new">
        <FeedbackForm></FeedbackForm>
      </Route>
    </Switch>
  );
};

export default Authenticator;
