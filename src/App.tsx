import { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import LetcureDetail from './pages/LectureDetail';
import LectureReview from './pages/LectureReview';
import Main from './pages/Main';
import PlayLecture from './pages/PlayLecture';
import ServiceInfo from './pages/ServiceInfo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
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
