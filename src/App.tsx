import { useState } from 'react';
import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import { useLocalStorage } from './hooks';
import { getMe } from './hooks/api';
import MainLayout from './pages/MainLayout';
import SigninLayout from './pages/SigninLayout';
import SignupLayout from './pages/SignupLayout';
import LetcureDetailLayout from './pages/LectureDetailLayout';
import LecturePlayLayout from './pages/LecturePlayLayout';
import LectureReviewLayout from './pages/LectureReviewLayout';
import IntroduceLayout from './pages/IntroduceLayout';

const App: FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [token, setToken] = useLocalStorage<string | null>(
    'token',
    localStorage.getItem('token'),
  );
  useEffect(() => {
    if (token !== null) {
      getMe(token).then((me) => {
        if (me) {
          if (me.role) {
            setUserType(me.role);
          }
        }
      });
    } else {
      setUserType(null);
    }
  }, [token]);
  return (
    <Router>
      <Header token={token} setToken={setToken} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <MainLayout token={token} setToken={setToken} userType={userType} />
          )}
        />
        <Route
          path="/signin"
          render={() => <SigninLayout token={token} setToken={setToken} />}
        />
        <Route
          path="/signup"
          render={() => <SignupLayout token={token} setToken={setToken} />}
        />
        <Route path="/lecture/:id" component={LetcureDetailLayout} />
        <Route path="/lecture-play/:id" component={LecturePlayLayout} />
        <Route path="/review" component={LectureReviewLayout} />
        <Route path="/info" component={IntroduceLayout} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
