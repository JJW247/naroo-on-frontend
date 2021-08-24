import { useState } from 'react';
import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import { useLocalStorage } from './hooks';
import { getMe } from './hooks/api';
import LetcureDetail from './pages/LectureDetail';
import LectureReview from './pages/LectureReview';
import Main from './pages/Main';
import PlayLecture from './pages/PlayLecture';
import ServiceInfo from './pages/ServiceInfo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

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
        <Route exact path="/" render={() => <Main userType={userType} />} />
        <Route
          path="/signin"
          render={() => <SignIn token={token} setToken={setToken} />}
        />
        <Route
          path="/signup"
          render={() => <SignUp token={token} setToken={setToken} />}
        />
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
