import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './pages/Main';

// https://player.vimeo.com/video/587581144?h=e542768ad0

const App: FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
