import { useState } from 'react';
import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/header/Header';
import { useLocalStorage } from './hooks';
import { getMe } from './hooks/api';
import MainLayout from './pages/MainLayout';
import SigninLayout from './pages/SigninLayout';
import SignupLayout from './pages/SignupLayout';
import LetcureDetailLayout from './pages/LectureDetailLayout';
import LecturePlayLayout from './pages/LecturePlayLayout';
import LectureReviewLayout from './pages/LectureReviewLayout';
import IntroduceLayout from './pages/IntroduceLayout';
import AdminLayout from './pages/AdminLayout';

const App: FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);
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
          if (me.nickname) {
            setUserNickname(me.nickname);
          }
        }
      });
    } else {
      setUserType(null);
    }
  }, [token]);
  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        userType={userType}
        nickname={userNickname}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            userType === 'admin' ? (
              <AdminLayout token={token} setToken={setToken} />
            ) : (
              <MainLayout token={token} setToken={setToken} />
            )
          }
        />
        <Route
          path="/signin"
          render={() => <SigninLayout token={token} setToken={setToken} />}
        />
        <Route
          path="/signup"
          render={() => <SignupLayout token={token} setToken={setToken} />}
        />
        <Route
          path="/lecture/:id"
          render={() => (
            <LetcureDetailLayout token={token} setToken={setToken} />
          )}
        />
        <Route
          path="/lecture-play/:id"
          render={() => <LecturePlayLayout token={token} setToken={setToken} />}
        />
        <Route path="/review" component={LectureReviewLayout} />
        <Route path="/info" component={IntroduceLayout} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
