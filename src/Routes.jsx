import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login/";
import UserRegister from "./pages/UserRegister/";
import Users from "./pages/Restricted/Users/";
import UserFeedbacks from "./pages/Restricted/UserFeedbacks/";
import FeedbackForm from "./pages/Restricted/FeedbackForm/";
const Routes = () => {
  const [allowed, setAllowed] = useState(true);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route path="/register">
          <UserRegister></UserRegister>
        </Route>

        <Route path="/users">
          <Users></Users>
        </Route>

        <Route path="users/feedback/:id">
          <UserFeedbacks></UserFeedbacks>
        </Route>

        <Route path="users/feedback/:id/new">
          <FeedbackForm></FeedbackForm>
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
