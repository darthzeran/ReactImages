import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./pages/Header";
import Display from "./pages/Display";
import "./styles/App.css";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router forceRefresh={true}>
        <div className="app">
          <Switch>
            <Route path="/:curAlbumId/:photoId">
              <Header />
              <Display />
            </Route>
            <Route path="/:curAlbumId">
              <Header />
              <Display />
            </Route>
            <Route path="/">
              <Header />
              <Display />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
