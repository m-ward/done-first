import React from "react";
import "./App.css";
import Shell from "./components/Shell";
import routes from "./config/routes";
import { Route, Switch } from "react-router";

const App: React.FC = () => {
  return (
    <Shell>
      <Switch>
        {routes.map((route) => {
          // if (route.isPrivate) {
          //   return (
          //       <ProtectedRoute component={route.component} path={route.path} />
          //   );
          // }
          return <Route component={route.component} path={route.path} />;
        })}
      </Switch>
    </Shell>
  );
};

export default App;
