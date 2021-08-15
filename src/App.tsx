import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import LetcureDetail from './pages/LectureDetail';
import Main from './pages/Main';

const App: FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/lecture/:id" component={LetcureDetail} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
