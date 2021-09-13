import React from "react";
import Shell from "./components/Shell";
import routes from "./config/routes";
import { Route, Switch } from "react-router";

const App: React.FC = () => {
  return (
    <Shell>
      <Switch>
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              component={route.component}
              path={route.path}
            />
          );
        })}
      </Switch>
    </Shell>
  );
};

export default App;
