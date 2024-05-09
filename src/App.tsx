import { AppDispatch, RootState } from './services/state/store';
import { Route, Routes } from 'react-router-dom';
import { setUser } from './services/state/user/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSelector } from 'react-redux';
import DashboardPage from './pages/private/DashboardPage';
import Login from './pages/public/Login';
import PrivateLayout from './pages/private/PrivateLayout';
import PublicLayout from './pages/public/PublicLayout';
import CoursePage from './pages/private/CoursePage';
import CoursesPage from './pages/private/CoursesPage';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { getItem: getIsLoggedInFromLS } = useLocalStorage('isLoggedIn');
  const isLoggedIn = getIsLoggedInFromLS();

  useEffect(() => {
    if (isLoggedIn === 'true') {
      dispatch(
        setUser({
          id: 1000000000001,
          email: 'dan@upliftcodecamp.com',
          familyName: 'Labrador',
          givenName: 'Dan',
          picture: `https://ui-avatars.com/api/?background=9050ad&color=fff&name=Dan+Labrador&size=40`,
        })
      );
    }
  }, [dispatch, isLoggedIn]);

  const user = useSelector((state: RootState) => state.user);

  const layout = user.isLoggedIn ? (
    <Route element={<PrivateLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CoursePage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Route>
  ) : (
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Route>
  );

  return <Routes>{layout}</Routes>;
}

export default App;
