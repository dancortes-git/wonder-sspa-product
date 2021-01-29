import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import TodoList from "./components/TodoList";

const generateClassName = createGenerateClassName({
  productionPrefix: "pro",
});

export default (props) => {
  const {
    getUser,
    addSignInEventListener,
    removeSignInEventListener,
    addSignOutEventListener,
    removeSignOutEventListener,
  } = props;
  const user = (getUser && getUser()) || null;
  const [isSignedIn, setIsSignedIn] = useState(!!user);

  const onEventSignInOrSignOutCallback = ({ detail: userLogged }) => {
    setIsSignedIn(!!userLogged);
  };

  // Add Sign In event listener
  useEffect(() => {
    addSignInEventListener &&
      addSignInEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignInEventListener &&
        removeSignInEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignInEventListener, removeSignInEventListener]);

  // Add Sign Out event listener
  useEffect(() => {
    addSignOutEventListener &&
      addSignOutEventListener(onEventSignInOrSignOutCallback);
    return () => {
      removeSignOutEventListener &&
        removeSignOutEventListener(onEventSignInOrSignOutCallback);
    };
  }, [addSignOutEventListener, removeSignOutEventListener]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router>
        <Switch>
          <Route path="/app">
            {!isSignedIn && <Redirect to="/" />}
            <TodoList />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};
