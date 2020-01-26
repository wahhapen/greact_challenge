import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Organization from "../Organization";
import RepositoryItem from "../Repository/RepositoryItem";
import Profile from "../Profile";
import Navigation from "./Navigation";

export const OwnerContext = React.createContext({
  owner: "",
  setOwner: () => {}
});
export const ReposContext = React.createContext({
  repositories: [],
  setRepos: () => {}
});

const App = () => {
  const [owner, setOwner] = useState("facebook");
  const [repositories, setRepos] = useState([]);

  return (
    <OwnerContext.Provider value={{ owner, setOwner }}>
      <ReposContext.Provider value={{ repositories, setRepos }}>
        <BrowserRouter>
          <div className="App">
            <Navigation />
            <Route path="/profile">
              <Profile />
            </Route>
            <Switch>
              <Route
                path="/repo/:id"
                children={<RepositoryItem organizationName={owner} />}
              />
            </Switch>
            <Route path="/" exact>
              <Organization organizationName={owner} />
            </Route>
          </div>
        </BrowserRouter>
      </ReposContext.Provider>
    </OwnerContext.Provider>
  );
};

export default App;
