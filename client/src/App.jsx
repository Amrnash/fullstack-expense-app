import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Signup, Home } from "./views";
import { NavBar, ProtectedRoute } from "./components";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <ProtectedRoute path="/">
          <Home />
        </ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
