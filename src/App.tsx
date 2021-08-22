import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import LetcureDetail from './pages/LectureDetail';
import LectureReview from './pages/LectureReview';
import Main from './pages/Main';
import PlayLecture from './pages/PlayLecture';
import ServiceInfo from './pages/ServiceInfo';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App: FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/lecture/:id" component={LetcureDetail} />
        <Route path="/lecture-play/:id" component={PlayLecture} />
        <Route path="/review" component={LectureReview} />
        <Route path="/info" component={ServiceInfo} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
