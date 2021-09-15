import { useState } from 'react';
import { FC, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { unmountComponentAtNode } from 'react-dom';

const AppRouterWrapper: FC = () => {
  return (
    <div
      className={`${
        process.env.NODE_ENV !== 'production' ? 'debug-screens' : ''
      }`}
    >
      <Router>
        <App />
      </Router>
      <ToastContainer />
    </div>
  );
};

const App: FC = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [rememberToken, setRememeberToken] = useLocalStorage<string | null>(
    'rememberToken',
    localStorage.getItem('rememberToken') === 'true' ? 'true' : 'false',
  );
  const [token, setToken] = useLocalStorage<string | null>(
    'token',
    localStorage.getItem('token') && localStorage.getItem('token') !== 'null'
      ? localStorage.getItem('token')
      : '',
  );
  useEffect(() => {
    if (token !== '') {
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
  const clearTokenHandler = (event: Event) => {
    event.preventDefault();
    localStorage.getItem('rememberToken') === 'false' ? setToken('') : null;
  };
  useEffect(() => {
    window.addEventListener('unload', clearTokenHandler);
    return () => window.removeEventListener('unload', clearTokenHandler);
  }, []);
  return (
    <>
      <Header
        token={token}
        setToken={setToken}
        setRememberToken={setRememeberToken}
        userType={userType}
        nickname={userNickname}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            token !== '' ? (
              userType === 'admin' ? (
                <AdminLayout token={token} setToken={setToken} />
              ) : (
                <MainLayout
                  token={token}
                  setToken={setToken}
                  requestToken={null}
                />
              )
            ) : (
              <MainLayout
                token={token}
                setToken={setToken}
                requestToken={null}
              />
            )
          }
        />
        <Route
          path="/signin"
          render={() => (
            <SigninLayout
              token={token}
              setToken={setToken}
              rememberToken={rememberToken}
              setRememberToken={setRememeberToken}
            />
          )}
        />
        <Route
          path="/signup"
          render={() => <SignupLayout token={token} setToken={setToken} />}
        />
        <Route
          path="/verify/:requestToken"
          render={(props) => {
            return (
              <MainLayout
                token={token}
                setToken={setToken}
                requestToken={props.match.params.requestToken}
              />
            );
          }}
        />
        <Route
          path="/lecture/:id"
          render={() => (
            <LetcureDetailLayout
              token={token}
              setToken={setToken}
              userType={userType}
              userNickname={userNickname}
            />
          )}
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
        {/* <Route
          path="/review"
          render={() =>
            userType === 'admin' ? (
              <AdminLayout token={token} setToken={setToken} />
            ) : (
              <LectureReviewLayout />
            )
          }
        /> */}
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
      <Footer />
    </>
  );
};

export default AppRouterWrapper;
