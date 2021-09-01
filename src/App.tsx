import { useState } from 'react';
import { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/header/Header';
import { useLocalStorage } from './hooks';
import { getMe, getResourceContent } from './hooks/api';
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
  const adminEmail = getResourceContent('admin_email');
  const headerLogo = getResourceContent('header_logo');
  const footerLogo = getResourceContent('footer_logo');
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
        headerLogo={headerLogo}
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
          render={() =>
            userType === 'admin' ? (
              <AdminLayout token={token} setToken={setToken} />
            ) : (
              <LetcureDetailLayout
                token={token}
                setToken={setToken}
                userType={userType}
              />
            )
          }
        />
        <Route
          path="/lecture-play/:id"
          render={() =>
            userType === 'admin' ? (
              <AdminLayout token={token} setToken={setToken} />
            ) : (
              <LecturePlayLayout token={token} setToken={setToken} />
            )
          }
        />
        <Route
          path="/review"
          render={() =>
            userType === 'admin' ? (
              <AdminLayout token={token} setToken={setToken} />
            ) : (
              <LectureReviewLayout />
            )
          }
        />
        <Route
          path="/info"
          render={() =>
            userType === 'admin' ? (
              <AdminLayout token={token} setToken={setToken} />
            ) : (
              <IntroduceLayout />
            )
          }
        />
      </Switch>
      <Footer adminEmail={adminEmail} footerLogo={footerLogo} />
    </Router>
  );
};

export default App;
